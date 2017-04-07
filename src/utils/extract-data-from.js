var _ = require('lodash');
var cheerio = require('cheerio');
var moment = require('moment');
var config = require('../../config');

var convertToISO8601Date = function (dateString) {
  if (_.isEmpty(dateString)) return '';
  var date = moment(dateString, 'MMM Do, YYYY');
  if (!date.isValid()) return '';
  return date.format('YYYY-MM-DD');
};

var seriesExtractor = function (response) {
  var $ = cheerio.load(response.list);

  var extractSeriesData = function () {
    var $name = $(this).find('.name a');
    var cover = $(this).find('.cover img').attr('data-original');
    var publisher = $(this).find('.publisher').text().trim();
    var count = parseInt($(this).find('.details').text().trim(), 10);
    var series = $(this).find('.series').text().trim();

    return {
      id: $name.attr('data-id'),
      name: $name.text().trim(),
      cover: config.rootUrl + cover,
      publisher: publisher,
      count: count,
      series: series
    };
  };

  return $('li').map(extractSeriesData).get();
};

var issueExtractor = function (response) {
  var $ = cheerio.load(response.list);

  var extractIssueData = function () {
    var id = $(this).attr('id').replace('comic-', '').trim();
    var name = $(this).find('.comic-title').text().trim();
    var cover = $(this).find('.comic-cover-art img').attr('data-original');

    var comicDetails = $(this).find('.comic-details').text().split('·');
    var publisher = (comicDetails[0] || '').trim();
    var releaseDate = convertToISO8601Date((comicDetails[1] || '').trim());
    var price = (comicDetails[2] || '').trim();

    var $description = $(this).find('.comic-description p');
    $description.find('a').remove();
    var description = $description.text().trim();

    return {
      id: id,
      name: name,
      cover: config.rootUrl + cover,
      publisher: publisher,
      description: description,
      releaseDate: releaseDate,
      price: price
    };
  };

  return $('li').map(extractIssueData).get();
};

var extractionHandler = {
  series: seriesExtractor,
  issue: issueExtractor
};

module.exports = function (response, options) {
  var handler = extractionHandler[options.type] || extractionHandler[config.defaultType];
  return handler(response);
};
