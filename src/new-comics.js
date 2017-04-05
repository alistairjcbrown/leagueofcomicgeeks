var accessList = require('./utils/access-list');

var listId = 'releases';

var getNewComics = function (userId, date, callback) {
  return accessList.get(userId, listId, {
    date_type: 'week',
    date: date,
    order: 'pulls'
  }, callback);
};

module.exports = {
  get: getNewComics,
};
