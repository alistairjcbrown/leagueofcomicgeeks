var _ = require('lodash');
var request = require('request');
var cookie = require('cookie');
var config = require('../../config');

var cookieJar = request.jar();
var user = null;

var oneDayInMs = 86400000;
var thirtyDaysInMs = (30 * 86400000);

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
    var yesterday = new Date(Date.now() - oneDayInMs);;
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
      var inThirtyDays = new Date(Date.now() + thirtyDaysInMs);
      var age = thirtyDaysInMs / 1000;
      setSession(session, inThirtyDays, age);
    }

    return true;
  },

  cookieJar: cookieJar
}
