var accessList = require('./utils/access-list');
var validateDate = require('./utils/validate-date');

var listId = 'releases';

var getNewComics = function (userId, date, options, callback) {
  var parameters = {
    date_type: 'week',
    date: date,
    order: 'pulls'
  };

  if (!validateDate(date)) return callback(new Error('Invalid date value provided'));

  return accessList.get(userId, listId, parameters, options, callback);
};

module.exports = {
  get: getNewComics,
};
