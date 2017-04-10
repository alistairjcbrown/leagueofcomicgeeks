const accessList = require('./utils/list-access');
const optionalOptions = require('./utils/optional-options');
const validateDate = require('./utils/validate-date');

const listId = 'releases';

const getNewComics = function (userId, date, options, callback) {
  const parameters = {
    date_type: 'week',
    date,
    order: 'pulls'
  };

  if (!validateDate(date)) {
    return callback(new Error('Invalid date value provided'));
  }

  return accessList.get(userId, listId, parameters, options, callback);
};

module.exports = {
  get: optionalOptions(getNewComics)
};
