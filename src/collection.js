var accessList = require('./utils/access-list');

var listId = 2;

var getCollection = function (userId, callback) {
  var parameters = {};
  return accessList.get(userId, listId, parameters, options, callback);
};

var addToCollection = function (comicId, callback) {
  return accessList.add(comicId, listId, callback);
};

var removeFromCollection = function (comicId, callback) {
  return accessList.remove(comicId, listId, callback);
};

module.exports = {
  get: getCollection,
  add: addToCollection,
  remove: removeFromCollection
};
