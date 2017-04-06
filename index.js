var _ = require('lodash');
var login = require('./src/login');
var wishList = require('./src/wish-list');
var readList = require('./src/read-list');
var collection = require('./src/collection');
var pullList = require('./src/pull-list');
var newComics = require('./src/new-comics');
var searchResults = require('./src/search-results');
var types = require('./src/utils/types');

/*
 * X Wish list
 * X Read list
 * X Collection
 * X Pull list
 * X Load auth details in
 * X New Comics
 * X Searching
 * X All lists above are series based, can we get comic based too?
 * X Standardise dates - how they're accepted, internal usage, data normalisation
 *
 * - Bulk actions on series level
 * - Filters for collection, new comics, etc.
 *
 * Tests
 *  - Unit tests
 *  - Integration tests
 * Tooling
 *  - Linting
 *  - Documentation
 *  - Publish module
 */

login('lofcg_test', '<password>', function (err, userId) {
  collection.remove(129544, { type: types.SERIES }, function () {
    console.log("Added to collection", arguments);
  });
  // wishList.get(userId, {}, function (err, wishlist) {
  //   console.log("Wish list", arguments);
  //   pullList.get(userId, '2017-03-22', { type: types.ISSUE }, function (err, pullList) {
  //     console.log("pull list", arguments);
      // wishList.add(pullList[0].id, function () {
      //   console.log("Wishlist add", arguments);
      //   wishList.get(userId, { type: types.ISSUE }, function (err, wishlist) {
      //     console.log("Wish list", arguments);
      //   });
      // });
  //   });
  // });
});
