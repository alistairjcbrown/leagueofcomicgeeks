var accessList = require('./utils/access-list');

var listId = 'search';

var getSearchResults = function (userId, query, callback) {
  return accessList.get(userId, listId, {
    title: query
  }, callback);
};

module.exports = {
  get: getSearchResults,
};
