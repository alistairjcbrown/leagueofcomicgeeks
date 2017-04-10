const _ = require('lodash');
const accessList = require('./utils/list-access');
const accessListBulk = require('./utils/list-access-bulk');
const optionalOptions = require('./utils/optional-options');
const validateDate = require('./utils/validate-date');
const types = require('./utils/types');

const listId = 1;

const getPullList = function (userId, date, options, callback) {
  const parameters = {
    date_type: 'week',
    date
  };

  if (!validateDate(date)) {
    return callback(new Error('Invalid date value provided'));
  }

  return accessList.get(userId, listId, parameters, options, callback);
};

const addToPullList = function (resourceId, options, callback) {
  if (options.type === types.ISSUE) {
    return accessList.add(resourceId, listId, callback);
  }

  const failureMessage = 'Unable to subscribe to series';
  const isSuccessResponse = function (body) {
    return _.includes(body, ' subscribed ');
  };
  return accessListBulk.modify(resourceId, listId, 'subscribe', isSuccessResponse, failureMessage, callback);
};

const removeFromPullList = function (resourceId, options, callback) {
  if (options.type === types.ISSUE) {
    return accessList.remove(resourceId, listId, callback);
  }

  const failureMessage = 'Unable to unsubscribe from series';
  const isSuccessResponse = function (body) {
    return _.includes(body, ' unsubscribed ');
  };
  return accessListBulk.modify(resourceId, listId, 'unsubscribe', isSuccessResponse, failureMessage, callback);
};

module.exports = {
  get: optionalOptions(getPullList),
  add: optionalOptions(addToPullList),
  remove: optionalOptions(removeFromPullList)
};
