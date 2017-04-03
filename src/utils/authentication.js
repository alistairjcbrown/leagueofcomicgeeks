var request = require('request');
var cookieJar = request.jar();

var user = {};

module.exports = {
  get: function () {
    return user;
  },

  set: function (id, username, email) {
    user = {
      id: id,
      username: username,
      email: email
    };
    return true;
  },

  cookieJar: cookieJar
}
