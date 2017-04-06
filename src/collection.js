var accessList = require('./utils/list-access');
var accessListBulk = require('./utils/list-access-bulk');
var types = require('./utils/types');

var listId = 2;

var getList = function (type) {
  return (type === types.SERIES) ? accessListBulk : accessList;
};

var getCollection = function (userId, options, callback) {
  var parameters = {};
  return accessList.get(userId, listId, parameters, options, callback);
};

var addToCollection = function (resourceId, options, callback) {
  return getList(options.type).add(resourceId, listId, callback);
};

var removeFromCollection = function (resourceId, options, callback) {
  return getList(options.type).remove(resourceId, listId, callback);
};

module.exports = {
  get: getCollection,
  add: addToCollection,
  remove: removeFromCollection
};
