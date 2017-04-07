var accessList = require('./list-access');
var accessListBulk = require('./list-access-bulk');
var optionalOptions = require('./optional-options');
var types = require('./types');

var getListAccess = function (type) {
  return (type === types.SERIES) ? accessListBulk : accessList;
};

module.exports = function (listId) {
  var getList = function (userId, options, callback) {
    var parameters = {};
    return accessList.get(userId, listId, parameters, options, callback);
  };

  var addToList = function (resourceId, options, callback) {
    return getListAccess(options.type).add(resourceId, listId, callback);
  };

  var removeFromList = function (resourceId, options, callback) {
    return getListAccess(options.type).remove(resourceId, listId, callback);
  };

  return {
    get: optionalOptions(getList),
    add: optionalOptions(addToList),
    remove: optionalOptions(removeFromList)
  };
};
