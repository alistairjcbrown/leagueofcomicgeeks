var accessList = require('./utils/list-access');

var listId = 3;

var getWishList = function (userId, options, callback) {
  var parameters = {};
  return accessList.get(userId, listId, parameters, options, callback);
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
