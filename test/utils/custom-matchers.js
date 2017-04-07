var _ = require('lodash');
var moment = require('moment');
var expectedIssueKeys = ['id', 'name', 'cover', 'publisher', 'description', 'releaseDate', 'price'];
var expectedSeriesKeys = ['id', 'name', 'cover', 'publisher', 'count', 'series'];

var createFailure = function (message) {
  return { pass: false, message: message };
};

var isNonEmptyString = function (value) {
  return _.isString(value) && !_.isEmpty(value);
};

var isPositiveNumber = function (value) {
  return _.isNumber(value) && value > 0;
};

var isUrl = function (value) {
  return _.startsWith(value, 'http://') || _.startsWith(value, 'https://');
};

var isDate = function (value) {
  return moment(value).isValid();
};

module.exports = {
  toBeAComicIssue: function(util, customEqualityTesters) {
    return {
      compare: function(actual) {
        if (_.difference(_.keys(actual), expectedIssueKeys).length > 0) {
          return createFailure('Unexpected keys in comic issue object');
        }

        if (!isNonEmptyString(actual.id)) return createFailure('Invalid id in comic issue object');
        if (!isNonEmptyString(actual.name)) return createFailure('Invalid name in comic issue object');
        if (!isUrl(actual.cover)) return createFailure('Invalid cover URL in comic issue object');
        if (!isNonEmptyString(actual.publisher)) return createFailure('Invalid publisher in comic issue object');
        if (_.isUndefined(actual.description)) return createFailure('Invalid description in comic issue object');
        if (!isDate(actual.releaseDate)) return createFailure('Invalid release date in comic issue object');
        if (_.isUndefined(actual.price)) return createFailure('Invalid price in comic issue object');

        return { pass: true };
      }
    };
  },

  toBeAComicSeries: function(util, customEqualityTesters) {
    return {
      compare: function(actual) {
        if (_.difference(_.keys(actual), expectedSeriesKeys).length > 0) {
          return createFailure('Unexpected keys in comic series object');
        }

        if (!isNonEmptyString(actual.id)) return createFailure('Invalid id in comic series object');
        if (!isNonEmptyString(actual.name)) return createFailure('Invalid name in comic series object');
        if (!isUrl(actual.cover)) return createFailure('Invalid cover URL in comic series object');
        if (!isNonEmptyString(actual.publisher)) return createFailure('Invalid publisher in comic series object');
        if (!isPositiveNumber(actual.count)) return createFailure('Invalid count in comic series object');
        if (_.isUndefined(actual.series)) return createFailure('Invalid series in comic series object');

        return { pass: true };
      }
    };
  }
};
