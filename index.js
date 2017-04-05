var _ = require('lodash');
var login = require('./src/login');
var wishList = require('./src/wish-list');
var readList = require('./src/read-list');
var collection = require('./src/collection');
var pullList = require('./src/pull-list');
var newComics = require('./src/new-comics');
var searchResults = require('./src/search-results');

/*
 * X Wish list
 * X Read list
 * X Collection
 * X Pull list
 * X Load auth details in
 * X New Comics
 * X Searching
 * X All lists above are series based, can we get comic based too?
 *
 * - Standardise dates - how they're accepted, internal usage, data normalisation
 * - Bulk actions on series level
 *
 * Tests
 *  - Unit tests
 *  - Integration tests
 * Tooling
 *  - Linting
 *  - Documentation
 *  - Publish module
 */

var authentication = require('./src/utils/authentication');

login('alistairjcbrown', '<password>', function (err, userId) {
  wishList.get(userId, {}, function (err, wishlist) {
    console.log("Wish list", arguments);
    pullList.get(userId, '05/17/2017', { type: 'issue' }, function (err, pullList) {
      console.log("pull list", arguments);
      // wishList.add(pullList[0].id, function () {
      //   console.log("Wishlist add", arguments);
      //   wishList.get(userId, { type: 'issue' }, function (err, wishlist) {
      //     console.log("Wish list", arguments);
      //   });
      // });
    });
  });
});
