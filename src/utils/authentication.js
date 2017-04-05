var _ = require('lodash');
var request = require('request');
var cookie = require('cookie');
var moment = require('moment');
var config = require('../../config');

var cookieJar = request.jar();
var user = null;

var getSession = function () {
  var cookieString = cookieJar.getCookieString(config.rootUrl);
  return cookie.parse(cookieString)[config.sessionKey];
};

var setSession = function (value, expiry, age) {
  var options = {
    expires: expiry,
    maxAge: age,
    path: '/'
  };
  var cookieValue = cookie.serialize(config.sessionKey, value, options);
  cookieJar.setCookie(cookieValue, config.rootUrl);
};

module.exports = {
  isAuthenticated: function () {
    return _.isObject(user) && _.isString(getSession());
  },

  destroy: function () {
    var yesterday = moment().subtract(1, 'day').toDate();
    setSession('', yesterday, 0);
    user = null;
  },

  get: function () {
    var session = getSession();
    if (!_.isObject(user)) return null;
    return _.extend({}, user, { session: session });
  },

  set: function (id, username, email, session) {
    user = {
      id: id,
      username: username,
      email: email
    };

    if (_.isString(session)) {
      var inThirtyDays = moment().add(30, 'days').toDate();
      var thirtyDaysInSeconds = 2592000;
      setSession(session, inThirtyDays, thirtyDaysInSeconds);
    }

    return true;
  },

  cookieJar: cookieJar
}
