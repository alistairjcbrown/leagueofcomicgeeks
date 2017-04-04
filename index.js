var _ = require('lodash');
var login = require('./src/login');
var wishList = require('./src/wish-list');
var readList = require('./src/read-list');
var collection = require('./src/collection');
var pullList = require('./src/pull-list');

/*
 * X Wish list
 * X Read list
 * X Collection
 * X Pull list
 * X Load auth details in
 * - New Comics
 * - Searching
 * - Ability to drill down in lists (eg. what titles in x series have I read?)
 * - Can only pull when not out, can only add to wish, read, collection when out -- how to enforce?
 * - bluk actions on series level
 */

var authentication = require('./src/utils/authentication');

login('alistairjcbrown', '<password>', function (err, userId) {
  authentication.destroy();

  wishList.add(1861049, function () {
    console.log("Wishlist ?", arguments);
    console.log(authentication.cookieJar.getCookieString('http://leagueofcomicgeeks.com'));
  });

  // pullList.get(26853, '3/22/2017', function () {
  //   console.log("pull list", arguments);
  //   console.log(authentication.get());
  //   console.log(cookie.parse(authentication.cookieJar.getCookieString('http://leagueofcomicgeeks.com')));
  //   console.log(authentication.cookieJar._jar.toJSON());
  // });
});
