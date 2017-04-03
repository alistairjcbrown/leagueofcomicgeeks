var accessList = require('./utils/access-list');

var listId = 3;

var getWishList = function (userId, callback) {
  return accessList.get(listId, userId, callback);
};

var addToWishList = function (comicId, callback) {
  return accessList.add(comicId, listId, callback);
};

var removeFromWishList = function (comicId, callback) {
  return accessList.remove(comicId, listId, callback);
};

module.exports = {
  get: getWishList,
  add: addToWishList,
  remove: removeFromWishList
};
