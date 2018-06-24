const request = require("request");
const authentication = require("./authentication");
const config = require("../../config");

module.exports = request.defaults({
  jar: authentication.cookieJar,
  baseUrl: config.rootUrl
});
