var accessList = require('./utils/access-list');

var listId = 5;

var getReadList = function (userId, callback) {
  return accessList.get(userId, listId, {}, callback);
};

var addToReadList = function (comicId, callback) {
  return accessList.add(comicId, listId, callback);
};

var removeFromReadList = function (comicId, callback) {
  return accessList.remove(comicId, listId, callback);
};

module.exports = {
  get: getReadList,
  add: addToReadList,
  remove: removeFromReadList
};
