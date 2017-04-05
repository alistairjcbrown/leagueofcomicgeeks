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
 *
 * - All lists above are series based, can we get comic based too?
 * --- Ability to drill down in lists (eg. what titles in x series have I read?)
 *
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

// login('alistairjcbrown', '<password>', function (err, userId) {
  // wishList.add(1861049, function () {
  //   console.log("Wishlist ?", arguments);
  //   console.log(authentication.cookieJar.getCookieString('http://leagueofcomicgeeks.com'));
  // });

  searchResults.get('', 'Roscoe', function () {
    console.log("search results", arguments);
  });
// });
