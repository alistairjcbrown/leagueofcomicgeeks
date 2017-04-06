var accessList = require('./utils/list-access');
var accessListBulk = require('./utils/list-access-bulk');
var types = require('./utils/types');

var listId = 5;

var getList = function (type) {
  return (type === types.SERIES) ? accessListBulk : accessList;
};

var getReadList = function (userId, options, callback) {
  var parameters = {};
  return accessList.get(userId, listId, parameters, options, callback);
};

var addToReadList = function (resourceId, options, callback) {
  return getList(options.type).add(resourceId, listId, callback);
};

var removeFromReadList = function (resourceId, options, callback) {
  return getList(options.type).remove(resourceId, listId, callback);
};

module.exports = {
  get: getReadList,
  add: addToReadList,
  remove: removeFromReadList
};
