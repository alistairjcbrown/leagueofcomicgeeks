var login = require('./src/login');
var wishList = require('./src/wish-list');
var readList = require('./src/read-list');
var collection = require('./src/collection');

/*
 * X Wish list
 * X Read list
 * X Collection
 * -- Ability to drill down in lists (eg. what titles in x series have I read?)
 * - Pull list (add one, add all)
 * - New Comics
 * - Searching
 */


login('alistairjcbrown', '<password>', function () {
  collection.get(function () {
    console.log("read list", arguments);
  });
});
