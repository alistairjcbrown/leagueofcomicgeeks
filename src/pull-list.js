var accessList = require('./utils/access-list');

var listId = 1;

var getPullList = function (userId, date, callback) {
  return accessList.get(userId, listId, {
    date_type: 'week',
    date: date
  }, callback);
};

var addToPullList = function (comicId, callback) {
  return accessList.add(comicId, listId, callback);
};

var removeFromPullList = function (comicId, callback) {
  return accessList.remove(comicId, listId, callback);
};

module.exports = {
  get: getPullList,
  add: addToPullList,
  remove: removeFromPullList
};
