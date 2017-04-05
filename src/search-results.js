var accessList = require('./utils/access-list');

var listId = 'search';

var getSearchResults = function (userId, query, options, callback) {
  var parameters = { title: query };
  return accessList.get(userId, listId, parameters, options, callback);
};

module.exports = {
  get: getSearchResults,
};
