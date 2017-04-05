var accessList = require('./utils/list-access');

var listId = 5;

var getReadList = function (userId, options, callback) {
  var parameters = {};
  return accessList.get(userId, listId, parameters, options, callback);
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
