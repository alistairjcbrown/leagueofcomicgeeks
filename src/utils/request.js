var request = require('request');
var authentication = require('./authentication');

module.exports = request.defaults({ jar: authentication.cookieJar });
