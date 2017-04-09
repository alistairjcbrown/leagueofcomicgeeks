var sinon = require('sinon');
var request = require('request');
sinon.spy(request, 'get');
sinon.spy(request, 'post');

var outputCallReport = require('./utils/output-call-report');
var customMatchers = require('./utils/custom-matchers');

global.editableUserId = 57714; // lofcg_test
global.readonlyUserId = 57833; // lofcg_readonly
global.testIssueId = 2881147; // Rogue One #1
global.testSeriesId = 118035; // Star Wars: Lando

var defaultTimeoutInterval = 20000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeoutInterval;
jasmine.getEnv().defaultTimeoutInterval = defaultTimeoutInterval;

describe('Integration tests', function () {
  afterAll(function () {
    outputCallReport('GET', request.get);
    outputCallReport('POST', request.post);
    request.get.restore();
    request.post.restore();
  });

  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  require('./not-logged-in')();
  require('./authentication')();
  require('./logged-in')();
});
