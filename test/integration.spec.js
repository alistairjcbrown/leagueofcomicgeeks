var customMatchers = require('./utils/custom-matchers');

global.editableUserId = 57714; // lofcg_test
global.readonlyUserId = 57833; // lofcg_readonly
global.testIssueId = 2881147; // Rogue One #1
global.testSeriesId = 118035; // Star Wars: Lando

var defaultTimeoutInterval = 20000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeoutInterval;
jasmine.getEnv().defaultTimeoutInterval = defaultTimeoutInterval;

describe('Integration tests', function () {
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  // Not logged in
  // X Get new comics (specific dates)
  // X search for comics (results, no results)
  // X get another users
  //    X collection
  //    X pull list
  //    X wish list
  //    X read list
  // X confirm items can't be added to collection
  //
  // *** don't forget error states
  //
  // X Logged in
  // X - confirm authenticaiton details
  // X Export authentication details
  // X Destroy authentication and confirm item can't be added to collection
  // X Load in authentication details and confirm item can be added to collection; then remove item
  //
  // X Copy tests for pure read only modules and run under logged in to confirm no issues with being authenticated
  //
  // X add series to collection
  // X add issue to collection
  // X confirm by reading collection
  // X remove issue from collection
  // X remove series from collection
  //
  // X repeat above for wish list
  // X repeat above for read list
  //
  // - add series to pull list
  // - add issue to pull list
  // - confirm by reading pull list
  // - remove issue from pull list
  // - remove series from pull list
  // - remove series issues from pull list
  //
  // Confirm account is empty again

  require('./not-logged-in')();
  require('./authentication')();
  require('./logged-in')();
});
