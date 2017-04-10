const sinon = require('sinon');
const request = require('request');

sinon.spy(request, 'get');
sinon.spy(request, 'post');

const outputCallReport = require('./utils/output-call-report');
const customMatchers = require('./utils/custom-matchers');

global.editableUserId = 57714; // lofcg_test
global.readonlyUserId = 57833; // lofcg_readonly
global.testIssueId = 2881147; // Rogue One #1
global.testSeriesId = 118035; // Star Wars: Lando

const defaultTimeoutInterval = 20000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeoutInterval;
jasmine.getEnv().defaultTimeoutInterval = defaultTimeoutInterval;

describe('Integration tests', () => {
  afterAll(() => {
    outputCallReport('GET', request.get);
    outputCallReport('POST', request.post);
    request.get.restore();
    request.post.restore();
  });

  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
  });

  require('./not-logged-in')();
  require('./authentication')();
  require('./logged-in')();
});
