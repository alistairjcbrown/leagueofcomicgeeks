var _ = require('lodash');
var accessList = require('./utils/list-access');
var accessListBulk = require('./utils/list-access-bulk');
var optionalOptions = require('./utils/optional-options');
var validateDate = require('./utils/validate-date');
var types = require('./utils/types');

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

var addToPullList = function (resourceId, options, callback) {
  if (options.type === types.ISSUE) {
    return accessList.add(resourceId, listId, callback);
  }

  var failureMessage = 'Unable to subscribe to series';
  var isSuccessResponse = function (body) {
    return _.includes(body, ' subscribed ');
  };
  return accessListBulk.modify(resourceId, listId, 'subscribe', isSuccessResponse, failureMessage, callback);
};

var removeFromPullList = function (resourceId, options, callback) {
  if (options.type === types.ISSUE) {
    return accessList.remove(resourceId, listId, callback);
  }

  var failureMessage = 'Unable to unsubscribe from series';
  var isSuccessResponse = function (body) {
    return _.includes(body, ' unsubscribed ');
  };
  return accessListBulk.modify(resourceId, listId, 'unsubscribe', isSuccessResponse, failureMessage, callback);
};

module.exports = {
  get: optionalOptions(getPullList),
  add: optionalOptions(addToPullList),
  remove: optionalOptions(removeFromPullList)
};
