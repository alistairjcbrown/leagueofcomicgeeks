var _ = require('lodash');
var cheerio = require('cheerio');
var request = require('./utils/request');
var authentication = require('./utils/authentication');
var convertObjectStringToObject = require('./utils/convert-object-string-to-object');
var config = require('../config');

var url = config.rootUrl + '/login';

module.exports = function (username, password, callback) {
  const credentials = {
    username: username,
    password: password
  };

  request.post({ url: url, form: credentials, followAllRedirects: true }, function (error, response, body) {
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
