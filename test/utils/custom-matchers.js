const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const moment = require('moment');

const expectedIssueKeys = ['id', 'name', 'cover', 'publisher', 'description', 'releaseDate', 'price'];
const expectedSeriesKeys = ['id', 'name', 'cover', 'publisher', 'count', 'series'];
const expectedSessionKeys = ['id', 'username', 'email', 'session'];

const createFailure = function (message) {
  return { pass: false, message };
};

const isNonEmptyString = function (value) {
  return _.isString(value) && !_.isEmpty(value);
};

const isPositiveNumber = function (value) {
  return _.isNumber(value) && value > 0;
};

const isUrl = function (value) {
  return _.startsWith(value, 'http://') || _.startsWith(value, 'https://');
};

const isDate = function (value) {
  return moment(value).isValid();
};

const snapshotDirectory = 'test-data';
const getSnapshotPath = function (snapshotName) {
  const callerPathTrace = new Error().stack.split('\n')[4];
  const callerPath = callerPathTrace.match(/\s+\(?(\/[^:]+):/)[1];
  return path.join(path.dirname(callerPath), snapshotDirectory, `${snapshotName}.json`);
};

module.exports = {
  toBeAComicIssue() {
    return {
      compare(actual) {
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

  toBeAComicSeries() {
    return {
      compare(actual) {
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
  },

  toBeASessionObject() {
    return {
      compare(actual, expected) {
        if (_.difference(_.keys(actual), expectedSessionKeys).length > 0) {
          return createFailure('Unexpected keys in session object');
        }

        if (actual.id !== expected.id) return createFailure('Unexpected id in session object');
        if (actual.username !== expected.username) return createFailure('Unexpected username in session object');
        if (!isNonEmptyString(actual.email)) return createFailure('Invalid email in session object');
        if (!isNonEmptyString(actual.session) || actual.session.length < 500) {
          return createFailure('Invalid session in session object');
        }

        return { pass: true };
      }
    };
  },

  toMatchJsonSnapshot() {
    return {
      compare(actual, snapshotName) {
        const snapshotPath = getSnapshotPath(snapshotName);
        let snapshotData;

        try {
          // eslint-disable-next-line import/no-dynamic-require
          snapshotData = require(snapshotPath);
        } catch (e) {
          fs.outputJsonSync(snapshotPath, actual, { spaces: 4 });
          // eslint-disable-next-line no-console
          console.warn(`Snapshot '${snapshotName}' created. Please re-run the tests.`);
          return { pass: false, message: () => 'Snapshot missing' };
        }

        try {
          expect(actual).toEqual(snapshotData);
          return { pass: true };
        } catch (e) {
          return { pass: false, message: () => e.message };
        }
      }
    };
  }
};
