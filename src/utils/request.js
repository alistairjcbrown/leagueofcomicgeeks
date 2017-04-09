var request = require('request');
var authentication = require('./authentication');
var config = require('../../config');

module.exports = request.defaults({
  jar: authentication.cookieJar,
  baseUrl: config.rootUrl
});
