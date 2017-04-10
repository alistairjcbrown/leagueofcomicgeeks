const accessList = require('./utils/list-access');
const optionalOptions = require('./utils/optional-options');

const listId = 'search';

const getSearchResults = function (userId, query, options, callback) {
  const parameters = { title: query };
  return accessList.get(userId, listId, parameters, options, callback);
};

module.exports = {
  get: optionalOptions(getSearchResults)
};
