var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var authentication = require('./utils/authentication');

var url = 'http://leagueofcomicgeeks.com/login';

var convertObjectStringToObject = function (objectString) {
  var sanitisedObjectString = _.trim(objectString.trim(), '{}')
    .trim()
    .replace(/'/g, '"')
    .replace(/\s/g, '')
    .replace(/,$/, '')
    .replace(/([^:,]+):/g, '"$1":');

  try {
    return JSON.parse('{' + sanitisedObjectString + '}');
  } catch(e) {
    return null;
  }
}

module.exports = function (username, password, callback) {
  const credentials = {
    username: username,
    password: password
  };

  request.post({ url: url, form: credentials, jar: authentication.cookieJar, followAllRedirects: true }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    var $ = cheerio.load(body);
    var $loginErrors = $('.alert-error');
    if ($loginErrors.length > 0) {
      return callback(new Error($loginErrors.eq(0).text()));
    }

    if (response && response.statusCode !== 200) {
      return callback(new Error('Unexpected status code ' + response.statusCode));
    }

    var matches = body.match(/UserVoice.push\(\['identify', ([^)]+)\]\)/);
    if (_.isNull(matches) || !_.isString(matches[1])) {
      return callback(new Error('Unable to retrieve user details'));
    }

    var userDetails = convertObjectStringToObject(matches[1]);
    if (_.isNull(userDetails)) {
      return callback(new Error('Unable to retrieve user details'));
    }

    authentication.set(userDetails.id, userDetails.name, userDetails.email)

    callback(null, userDetails.id);
  });

};
