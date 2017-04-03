var login = require('./src/login');
var wishList = require('./src/wish-list');
var readList = require('./src/read-list');

/*
 * - Wish list
 * - Pull list (add one, add all)
 * - Read list
 * - Collection
 * - Single approach to dealing with lists
 * - Ability to drill down in lists (eg. what titles in x series have I read?)
 */


login('alistairjcbrown', '<password>', function () {
  readList.get(function () {
    console.log("read list", arguments);
  });
});
