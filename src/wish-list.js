var accessList = require('./utils/list-access');
var accessListBulk = require('./utils/list-access-bulk');
var types = require('./utils/types');

var listId = 3;

var getList = function (type) {
  return (type === types.SERIES) ? accessListBulk : accessList;
};

var getWishList = function (userId, options, callback) {
  var parameters = {};
  return accessList.get(userId, listId, parameters, options, callback);
};

var addToWishList = function (resourceId, options, callback) {
  return getList(options.type).add(resourceId, listId, callback);
};

var removeFromWishList = function (resourceId, options, callback) {
  return getList(options.type).remove(resourceId, listId, callback);
};

module.exports = {
  get: getWishList,
  add: addToWishList,
  remove: removeFromWishList
};
