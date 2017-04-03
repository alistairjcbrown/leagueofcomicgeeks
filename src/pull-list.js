var accessList = require('./utils/access-list');

var listId = 1;

var getPullList = function (userId, callback) {
  return accessList.get(listId, userId, callback);
};

var addToPullList = function (comicId, callback) {
  return accessList.add(comicId, listId, callback);
};

var removeFromPullList = function (comicId, callback) {
  return accessList.remove(comicId, listId, callback);
};

module.exports = {
  get: getPullList,
  add: addToPullList,
  remove: removeFromPullList
};
