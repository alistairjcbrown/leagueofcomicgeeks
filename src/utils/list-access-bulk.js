var _ = require('lodash');
var queryString = require('query-string');
var request = require('./request');
var authentication = require('./authentication');
var extractDataFrom = require('./extract-data-from');
var config = require('../../config');

var myListUrl = '/comic/my_list_bulk';
var defaultIsSuccessful = function (body) {
  return !_.isNaN(parseInt(body, 10));
};

var modifyList = function (seriesId, listId, actionId, isSuccessful, failureMessage, callback) {
  if (!authentication.isAuthenticated()) {
    return callback(new Error('Not authenticated'));
  }

  var data = {
    series_id: seriesId,
    list_id: listId,
    action: actionId
  };

  request.post({ uri: myListUrl, form: data }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    if (!isSuccessful(body)) {
      return callback(new Error(failureMessage));
    }

    if (response && response.statusCode !== 200) {
      return callback(new Error('Unexpected status code ' + response.statusCode));
    }

    callback(null);
  });
};

var addToList = function (seriesId, listId, callback) {
  var actionId = 'add';
  var failureMessage = 'Unable to add series to list';
  return modifyList(seriesId, listId, actionId, defaultIsSuccessful, failureMessage, callback);
};

var removeFromList = function (seriesId, listId, callback) {
  var actionId = 'remove';
  var failureMessage = 'Unable to remove series from list';
  return modifyList(seriesId, listId, actionId, defaultIsSuccessful, failureMessage, callback);
};

module.exports = {
  add: addToList,
  remove: removeFromList,
  modify: modifyList
};
