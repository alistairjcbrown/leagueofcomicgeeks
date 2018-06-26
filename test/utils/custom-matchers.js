const path = require("path");
const fs = require("fs-extra");
const _ = require("lodash");
const moment = require("moment");

const expectedIssueKeys = [
  "id",
  "variantId",
  "name",
  "url",
  "cover",
  "publisher",
  "description",
  "releaseDate",
  "price",
  "diamondSku",
  "userMetrics"
];
const expectedSeriesKeys = [
  "id",
  "name",
  "url",
  "cover",
  "publisher",
  "count",
  "series"
];
const expectedSessionKeys = ["id", "username", "email", "session"];

const createFailure = function(message, receivedValue) {
  return {
    pass: false,
    message: `${message} - Received ${JSON.stringify(receivedValue)}`
  };
};

const isNonEmptyString = function(value) {
  return _.isString(value) && !_.isEmpty(value);
};

const isNonNegativeNumber = function(value) {
  return _.isNumber(value) && value >= 0;
};

const isUrl = function(value) {
  return _.startsWith(value, "http://") || _.startsWith(value, "https://");
};

const isDate = function(value) {
  return moment(value).isValid();
};

const snapshotDirectory = "test-data";
const getSnapshotPath = function(snapshotName) {
  const callerPathTrace = new Error().stack.split("\n")[4];
  const callerPath = callerPathTrace.match(/\s+\(?(\/[^:]+):/)[1];
  return path.join(
    path.dirname(callerPath),
    snapshotDirectory,
    `${snapshotName}.json`
  );
};

module.exports = {
  toBeAComicIssue() {
    return {
      compare(actual) {
        if (_.difference(_.keys(actual), expectedIssueKeys).length > 0) {
          return createFailure("Unexpected keys in comic issue object");
        }

        const {
          id,
          variantId,
          url,
          name,
          cover,
          publisher,
          description,
          releaseDate,
          price,
          diamondSku,
          userMetrics
        } = actual;

        if (!isNonEmptyString(id)) {
          return createFailure("Invalid id in comic issue object", id);
        }
        if (!isNonEmptyString(variantId) && !_.isNull(variantId)) {
          return createFailure(
            "Invalid variant id in comic issue object",
            variantId
          );
        }
        if (!isUrl(url)) {
          return createFailure("Invalid URL in comic issue object", url);
        }
        if (!isNonEmptyString(name)) {
          return createFailure("Invalid name in comic issue object", name);
        }
        if (!isUrl(cover) && !_.isNull(cover)) {
          return createFailure(
            "Invalid cover URL in comic issue object",
            cover
          );
        }
        if (!isNonEmptyString(publisher)) {
          return createFailure(
            "Invalid publisher in comic issue object",
            publisher
          );
        }
        if (_.isUndefined(description)) {
          return createFailure(
            "Invalid description in comic issue object",
            description
          );
        }
        if (!isDate(releaseDate)) {
          return createFailure(
            "Invalid release date in comic issue object",
            releaseDate
          );
        }
        if (_.isUndefined(price)) {
          return createFailure("Invalid price in comic issue object", price);
        }
        if (!isNonEmptyString(diamondSku) && !_.isNull(diamondSku)) {
          return createFailure(
            "Invalid Diamond SKU in comic issue object",
            diamondSku
          );
        }
        if (
          !isNonNegativeNumber(userMetrics.pulled) &&
          !_.isNull(userMetrics.pulled)
        ) {
          return createFailure(
            "Invalid pulled user metric in comic issue object",
            userMetrics.pulled
          );
        }
        if (
          !isNonNegativeNumber(userMetrics.added) &&
          !_.isNull(userMetrics.added)
        ) {
          return createFailure(
            "Invalid added user metric in comic issue object",
            userMetrics.added
          );
        }
        if (
          !isNonNegativeNumber(userMetrics.consensusVote) &&
          !_.isNull(userMetrics.consensusVote)
        ) {
          return createFailure(
            "Invalid consensus vote user metric in comic issue object",
            userMetrics.consensusVote
          );
        }
        if (
          !isNonNegativeNumber(userMetrics.pickOfTheWeekVote) &&
          !_.isNull(userMetrics.pickOfTheWeekVote)
        ) {
          return createFailure(
            "Invalid pick of the week vote user metric in comic issue object",
            userMetrics.pickOfTheWeekVote
          );
        }

        return { pass: true };
      }
    };
  },

  toBeAComicSeries() {
    return {
      compare(actual) {
        if (_.difference(_.keys(actual), expectedSeriesKeys).length > 0) {
          return createFailure("Unexpected keys in comic series object");
        }

        const { id, url, name, cover, publisher, count, series } = actual;
        if (!isNonEmptyString(id))
          return createFailure("Invalid id in comic series object", id);
        if (!isUrl(url))
          return createFailure("Invalid URL in comic series object", url);
        if (!isNonEmptyString(name))
          return createFailure("Invalid name in comic series object", name);
        if (!isUrl(cover))
          return createFailure(
            "Invalid cover URL in comic series object",
            cover
          );
        if (!isNonEmptyString(publisher))
          return createFailure(
            "Invalid publisher in comic series object",
            publisher
          );
        if (!isNonNegativeNumber(count))
          return createFailure("Invalid count in comic series object", count);
        if (_.isUndefined(series))
          return createFailure("Invalid series in comic series object", series);

        return { pass: true };
      }
    };
  },

  toBeASessionObject() {
    return {
      compare(actual, expected) {
        if (_.difference(_.keys(actual), expectedSessionKeys).length > 0) {
          return createFailure("Unexpected keys in session object");
        }

        const { id, username, email, session } = actual;
        if (id !== expected.id)
          return createFailure("Unexpected id in session object", id);
        if (username !== expected.username)
          return createFailure(
            "Unexpected username in session object",
            username
          );
        if (!isNonEmptyString(email))
          return createFailure("Invalid email in session object", email);
        if (!isNonEmptyString(session) || session.length < 500) {
          return createFailure("Invalid session in session object", session);
        }

        return { pass: true };
      }
    };
  },

  toMatchJsonSnapshot() {
    return {
      compare(input, snapshotName) {
        const actual = _.map(input, value => _.omit(value, "userMetrics"));
        const snapshotPath = getSnapshotPath(snapshotName);
        let snapshotData;

        try {
          // eslint-disable-next-line import/no-dynamic-require
          snapshotData = require(snapshotPath);
        } catch (e) {
          fs.outputJsonSync(snapshotPath, actual, { spaces: 4 });
          // eslint-disable-next-line no-console
          console.warn(
            `\nSnapshot '${snapshotName}' created. Please re-run the tests.`
          );
          return { pass: false, message: () => "Snapshot missing" };
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
