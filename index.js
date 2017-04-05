var _ = require('lodash');
var login = require('./src/login');
var wishList = require('./src/wish-list');
var readList = require('./src/read-list');
var collection = require('./src/collection');
var pullList = require('./src/pull-list');
var newComics = require('./src/new-comics');

/*
 * X Wish list
 * X Read list
 * X Collection
 * X Pull list
 * X Load auth details in
 * - New Comics
 *
 * - All lists above are series based, can we get comic based too?
 * - Searching
 * - Ability to drill down in lists (eg. what titles in x series have I read?)
 * - Can only pull when not out, can only add to wish, read, collection when out -- how to enforce?
 * - bluk actions on series level
 */

var authentication = require('./src/utils/authentication');

// login('alistairjcbrown', '<password>', function (err, userId) {
  // wishList.add(1861049, function () {
  //   console.log("Wishlist ?", arguments);
  //   console.log(authentication.cookieJar.getCookieString('http://leagueofcomicgeeks.com'));
  // });

  newComics.get('', '2017-04-05', function () {
    console.log("new comics", arguments);
  });
// });
