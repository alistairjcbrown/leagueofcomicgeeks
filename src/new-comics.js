var accessList = require('./utils/access-list');

var listId = 'releases';

var getNewComics = function (userId, date, options, callback) {
  var parameters = {
    date_type: 'week',
    date: date,
    order: 'pulls'
  };
  return accessList.get(userId, listId, parameters, options, callback);
};

module.exports = {
  get: getNewComics,
};
