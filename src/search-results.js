var accessList = require('./utils/list-access');

var listId = 'search';

var getSearchResults = function (userId, query, options, callback) {
  var parameters = { title: query };
  return accessList.get(userId, listId, parameters, options, callback);
};

module.exports = {
  get: getSearchResults,
};
