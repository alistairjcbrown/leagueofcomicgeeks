var accessList = require('./list-access');
var accessListBulk = require('./list-access-bulk');
var optionalOptions = require('./optional-options');
var types = require('./types');

var getList = function (type) {
  return (type === types.SERIES) ? accessListBulk : accessList;
};

module.exports = function (listId) {
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

  return {
    get: optionalOptions(getReadList),
    add: optionalOptions(addToReadList),
    remove: optionalOptions(removeFromReadList)
  };
};
