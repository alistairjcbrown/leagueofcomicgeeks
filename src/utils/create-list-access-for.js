const accessList = require('./list-access');
const accessListBulk = require('./list-access-bulk');
const optionalOptions = require('./optional-options');
const types = require('./types');

const getListAccess = function (type) {
  return (type === types.SERIES) ? accessListBulk : accessList;
};

module.exports = function (listId) {
  const getList = function (userId, options, callback) {
    const parameters = {};
    return accessList.get(userId, listId, parameters, options, callback);
  };

  const addToList = function (resourceId, options, callback) {
    return getListAccess(options.type).add(resourceId, listId, callback);
  };

  const removeFromList = function (resourceId, options, callback) {
    return getListAccess(options.type).remove(resourceId, listId, callback);
  };

  return {
    get: optionalOptions(getList),
    add: optionalOptions(addToList),
    remove: optionalOptions(removeFromList)
  };
};
