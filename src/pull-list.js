var accessList = require('./utils/list-access');
var validateDate = require('./utils/validate-date');

var listId = 1;

var getPullList = function (userId, date, options, callback) {
  var parameters = {
    date_type: 'week',
    date: date
  };

  if (!validateDate(date)) {
    return callback(new Error('Invalid date value provided'));
  }

  return accessList.get(userId, listId, parameters, options, callback);
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
