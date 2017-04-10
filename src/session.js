const _ = require('lodash');
const cheerio = require('cheerio');
const cookie = require('cookie');
const request = require('./utils/request');
const authentication = require('./utils/authentication');
const convertObjectStringToObject = require('./utils/convert-object-string-to-object');
const config = require('../config');

const loginUrl = '/login';
const logoutUrl = '/logout';
const protectedUrl = '/comics/submit-new-series';

const getSessionFromCookie = function (cookieString) {
  return cookie.parse(cookieString)[config.sessionKey];
};

const createSession = function (username, password, callback) {
  const credentials = {
    username,
    password
  };

  request.post({ uri: loginUrl, form: credentials, followAllRedirects: true }, (error, response, body) => {
    if (error) {
      return callback(error);
    }

    if (response && response.statusCode !== 200) {
      return callback(new Error(`Unexpected status code ${response.statusCode}`));
    }

    const $ = cheerio.load(body);
    const $loginErrors = $('.alert-error');
    if ($loginErrors.length > 0) {
      return callback(new Error($loginErrors.eq(0).text()));
    }

    const matches = body.match(/UserVoice.push\(\['identify', ([^)]+)\]\)/);
    if (_.isNull(matches) || !_.isString(matches[1])) {
      return callback(new Error('Unable to retrieve user details'));
    }

    const userDetails = convertObjectStringToObject(matches[1]);
    if (_.isNull(userDetails)) {
      return callback(new Error('Unable to retrieve user details'));
    }

    authentication.set(userDetails.id, userDetails.name, userDetails.email);

    return callback(null, userDetails.id);
  });
};

const validateSession = function (callback) {
  request.get({ uri: protectedUrl, followRedirect: false }, (error, response) => {
    if (error) {
      return callback(error);
    }

    if (response && response.statusCode === 200) {
      return callback(null, true);
    }

    if (response && response.statusCode === 302) {
      if (response.headers.location === config.rootUrl + loginUrl) {
        return callback(null, false);
      }

      return callback(new Error(`Unexpected redirection to ${response.headers.location}`));
    }

    if (response) {
      return callback(new Error(`Unexpected status code ${response.statusCode}`));
    }

    return callback(new Error('Empty response'));
  });
};

const destroySession = function (callback) {
  request.get({ uri: logoutUrl, followAllRedirects: true }, (error, response) => {
    if (error) {
      return callback(error);
    }

    authentication.destroy();

    const isEmptyRedirect = (response && response.statusCode === 302 && response.headers.location === '');
    const sessionCookie = _.find(response.headers['set-cookie'], (cookieString) => {
      const session = getSessionFromCookie(cookieString);
      return _.isString(session);
    });
    const sessionReset = (_.isString(sessionCookie) && getSessionFromCookie(sessionCookie) === 'a:0:{}');

    if (isEmptyRedirect && sessionReset) {
      return callback(null);
    }

    return callback(new Error('Unable to confirm successful log out'));
  });
};

const getSession = function (callback) {
  _.defer(() => {
    callback(null, authentication.get());
  });
};

const setSession = function (authDetails, callback) {
  _.defer(() => {
    const sessionSet = authentication.set(authDetails.id, authDetails.username, authDetails.email, authDetails.session);
    callback(null, sessionSet);
  });
};

module.exports = {
  create: createSession,
  validate: validateSession,
  destroy: destroySession,
  get: getSession,
  set: setSession
};
