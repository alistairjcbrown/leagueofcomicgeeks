var _ = require('lodash');
var queryString = require('query-string');
var request = require('./request');
var authentication = require('./authentication');
var extractDataFrom = require('./extract-data-from');
var getPublisherIds = require('./get-publisher-ids');
var config = require('../../config');

var myListUrl = config.rootUrl + '/comic/my_list_move';
var getComicsUrl = config.rootUrl + '/comic/get_comics';

var modifyList = function (comicId, listId, actionId, failureMessage, callback) {
  if (!authentication.isAuthenticated()) {
    return callback(new Error('Not authenticated'));
  }

  var data = {
    comic_id: comicId,
    list_id: listId,
    action_id: actionId
  };

  request.post({ url: myListUrl, form: data }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    if (_.isNaN(parseInt(body, 10))) {
      return callback(new Error(failureMessage));
    }

    if (response && response.statusCode !== 200) {
      return callback(new Error('Unexpected status code ' + response.statusCode));
    }

    callback(null);
  });
};

var getList = function (userId, listId, parameters, options, callback) {
  var viewType = {
    issue: 'list',
    series: 'thumbs'
  };

  var type = options.type || config.defaultType;
  var urlParameters = _.extend({
    list: listId,
    list_option: type,
    user_id: userId,
    view: viewType[type] || 'thumbs',
    order: 'alpha-asc',
    publisher: getPublisherIds(options.publishers)
  }, parameters);
  var urlParameterString = queryString.stringify(urlParameters, { arrayFormat: 'bracket' });

  var url = getComicsUrl + '?' + urlParameterString;
  request.get(url, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    if (response && response.statusCode !== 200) {
      return callback(new Error('Unexpected status code ' + response.statusCode));
    }

    var responseJson;
    try {
      responseJson = JSON.parse(body);
    } catch(e) {
      return callback(new Error('Unable to parse response'));
    }

    if (!_.isObject(responseJson) || !_.isString(responseJson.list)) {
      return callback(new Error('Unknown response format'));
    }

    var list = extractDataFrom(responseJson, options);
    callback(null, list);
  });
};

var addToList = function (comicId, listId, callback) {
  var actionId = 1;
  var failureMessage = 'Unable to add comic to list';
  return modifyList(comicId, listId, actionId, failureMessage, callback);
};

var removeFromList = function (comicId, listId, callback) {
  var actionId = 0;
  var failureMessage = 'Unable to remove comic from list';
  return modifyList(comicId, listId, actionId, failureMessage, callback);
};

module.exports = {
  get: getList,
  add: addToList,
  remove: removeFromList
};
