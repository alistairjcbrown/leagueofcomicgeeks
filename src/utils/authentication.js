const _ = require('lodash');
const request = require('request');
const cookie = require('cookie');
const moment = require('moment');
const config = require('../../config');

const cookieJar = request.jar();
let user = null;

const getSession = function () {
  const cookieString = cookieJar.getCookieString(config.rootUrl);
  return cookie.parse(cookieString)[config.sessionKey];
};

const setSession = function (value, expiry, age) {
  const options = {
    expires: expiry,
    maxAge: age,
    path: '/'
  };
  const cookieValue = cookie.serialize(config.sessionKey, value, options);
  cookieJar.setCookie(cookieValue, config.rootUrl);
};

module.exports = {
  isAuthenticated() {
    return _.isObject(user) && _.isString(getSession());
  },

  destroy() {
    const yesterday = moment().subtract(1, 'day').toDate();
    setSession('', yesterday, 0);
    user = null;
  },

  get() {
    const session = getSession();
    if (!_.isObject(user)) return null;
    return _.extend({}, user, { session });
  },

  set(id, username, email, session) {
    user = {
      id,
      username,
      email
    };

    if (_.isString(session)) {
      const inThirtyDays = moment().add(30, 'days').toDate();
      const thirtyDaysInSeconds = 2592000;
      setSession(session, inThirtyDays, thirtyDaysInSeconds);
    }

    return true;
  },

  cookieJar
};
