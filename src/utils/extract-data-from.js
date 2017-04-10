const _ = require('lodash');
const cheerio = require('cheerio');
const moment = require('moment');
const config = require('../../config');

const convertToISO8601Date = function (dateString) {
  if (_.isEmpty(dateString)) return '';
  const date = moment(dateString, 'MMM Do, YYYY');
  if (!date.isValid()) return '';
  return date.format('YYYY-MM-DD');
};

const seriesExtractor = function (response) {
  const $ = cheerio.load(response.list);

  const extractSeriesData = function () {
    const $name = $(this).find('.name a');
    const cover = $(this).find('.cover img').attr('data-original');
    const publisher = $(this).find('.publisher').text().trim();
    const count = parseInt($(this).find('.details').text().trim(), 10);
    const series = $(this).find('.series').text().trim();

    return {
      id: $name.attr('data-id'),
      name: $name.text().trim(),
      cover: config.rootUrl + cover,
      publisher,
      count,
      series
    };
  };

  return $('li').map(extractSeriesData).get();
};

const issueExtractor = function (response) {
  const $ = cheerio.load(response.list);

  const extractIssueData = function () {
    const id = $(this).attr('id').replace('comic-', '').trim();
    const name = $(this).find('.comic-title').text().trim();
    const cover = $(this).find('.comic-cover-art img').attr('data-original');

    const comicDetails = $(this).find('.comic-details').text().split('·');
    const publisher = (comicDetails[0] || '').trim();
    const releaseDate = convertToISO8601Date((comicDetails[1] || '').trim());
    const price = (comicDetails[2] || '').trim();

    const $description = $(this).find('.comic-description p');
    $description.find('a').remove();
    const description = $description.text().trim();

    return {
      id,
      name,
      cover: config.rootUrl + cover,
      publisher,
      description,
      releaseDate,
      price
    };
  };

  return $('li').map(extractIssueData).get();
};

const extractionHandler = {
  series: seriesExtractor,
  issue: issueExtractor
};

module.exports = function (response, options) {
  const handler = extractionHandler[options.type] || extractionHandler[config.defaultType];
  return handler(response);
};
