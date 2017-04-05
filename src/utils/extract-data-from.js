var cheerio = require('cheerio');
var config = require('../../config');

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
      cover: cover,
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
    var releaseDate = (comicDetails[1] || '').trim(); // TODO - convert to standard, moment?
    var price = (comicDetails[2] || '').trim();

    var $description = $(this).find('.comic-description p');
    $description.find('a').remove();
    var description = $description.text().trim();

    return {
      id: id,
      name: name,
      cover: cover,
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
