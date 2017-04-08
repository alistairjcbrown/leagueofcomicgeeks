var lofcbg = require('../');
var customMatchers = require('./utils/custom-matchers');

global.editableUserId = 57714; // lofcg_test
global.readonlyUserId = 57833; // lofcg_readonly
global.testComicId = 2881147; // Rogue One #1

jasmine.getEnv().defaultTimeoutInterval = 20000;

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
  // - Copy tests for pure read only modules and run under logged in to confirm no issues with being authenticated
  //
  // - add series to collection
  // - add issue to collection
  // - confirm by reading collection
  // - remove issue from collection
  // - remove series from collection
  // {repeat above for wish list and read list}
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
});
