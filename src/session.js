var _ = require('lodash');
var cheerio = require('cheerio');
var cookie = require('cookie');
var request = require('./utils/request');
var authentication = require('./utils/authentication');
var convertObjectStringToObject = require('./utils/convert-object-string-to-object');
var config = require('../config');

var loginUrl = config.rootUrl + '/login';
var logoutUrl = config.rootUrl + '/logout';
var protectedUrl = config.rootUrl + '/comics/submit-new-series';

var getSession = function (cookieString) {
  return cookie.parse(cookieString)[config.sessionKey];
};

var create = function (username, password, callback) {
  const credentials = {
    username: username,
    password: password
  };

  request.post({ url: loginUrl, form: credentials, followAllRedirects: true }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    if (response && response.statusCode !== 200) {
      return callback(new Error('Unexpected status code ' + response.statusCode));
    }

    var $ = cheerio.load(body);
    var $loginErrors = $('.alert-error');
    if ($loginErrors.length > 0) {
      return callback(new Error($loginErrors.eq(0).text()));
    }

    var matches = body.match(/UserVoice.push\(\['identify', ([^)]+)\]\)/);
    if (_.isNull(matches) || !_.isString(matches[1])) {
      return callback(new Error('Unable to retrieve user details'));
    }

    var userDetails = convertObjectStringToObject(matches[1]);
    if (_.isNull(userDetails)) {
      return callback(new Error('Unable to retrieve user details'));
    }

    authentication.set(userDetails.id, userDetails.name, userDetails.email);

    callback(null, userDetails.id);
  });
};

var validate = function (callback) {
  request.get({ url: protectedUrl, followRedirect: false }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    if (response && response.statusCode === 200) {
      return callback(null, true);
    }

    if (response && response.statusCode === 302) {
      if (response.headers.location === loginUrl) {
        return callback(null, false);
      }

      return callback(new Error('Unexpected redirection to ' + response.headers.location));
    }

    if (response) {
      return callback(new Error('Unexpected status code ' + response.statusCode));
    }

    return callback(new Error('Empty response'));
  });
};

var destroy = function (callback) {
  request.get({ url: logoutUrl, followAllRedirects: true }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    authentication.destroy();

    var isEmptyRedirect = (response && response.statusCode === 302 && response.headers.location === '');
    var sessionCookie = _.find(response.headers['set-cookie'], function (cookieString) {
      return _.isString(getSession(cookieString));
    });
    var sessionReset = (_.isString(sessionCookie) && getSession(sessionCookie) === 'a:0:{}');

    if (isEmptyRedirect && sessionReset) {
      return callback(null);
    }

    callback(new Error('Unable to confirm successful log out'));
  });
};

module.exports = {
  create: create,
  validate: validate,
  destroy: destroy
};
