var login = require('./src/login');
var wishList = require('./src/wish-list');
var readList = require('./src/read-list');
var collection = require('./src/collection');
var pullList = require('./src/pull-list');

/*
 * X Wish list
 * X Read list
 * X Collection
 * -- Ability to drill down in lists (eg. what titles in x series have I read?)
 * - Pull list (add one, add all)
 * - Can only pull when not out, can only add to wish, read, collection when out -- how to enforce?
 * - New Comics
 * - Searching
 */

login('alistairjcbrown', '<password>', function (err, userId) {
  pullList.get(userId, '3/22/2017', function () {
    console.log("pull list", arguments);
  });
});
