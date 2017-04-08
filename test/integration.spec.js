var lofcbg = require('../');
var customMatchers = require('./utils/custom-matchers');

global.testUserId = 26853; // alistairjcbrown
global.testUserId2 = 42590; // undeadquinn
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
  // Logged in
  // - confirm authenticaiton details
  // Export authentication details
  // Destroy authentication and confirm item can't be added to collection
  // Load in authentication details and confirm item can be added to collection; then remove item
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
});
