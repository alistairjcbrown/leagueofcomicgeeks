const _ = require('lodash');
const queryString = require('query-string');
const request = require('./request');
const authentication = require('./authentication');
const extractDataFrom = require('./extract-data-from');
const getPublisherIds = require('./get-publisher-ids');
const config = require('../../config');

const myListUrl = '/comic/my_list_move';
const getComicsUrl = '/comic/get_comics';

const modifyList = function (comicId, listId, actionId, failureMessage, callback) {
  if (!authentication.isAuthenticated()) {
    callback(new Error('Not authenticated'));
    return;
  }

  const data = {
    comic_id: comicId,
    list_id: listId,
    action_id: actionId
  };

  request.post({ uri: myListUrl, form: data }, (error, response, body) => {
    if (error) {
      return callback(error);
    }

    if (_.isNaN(parseInt(body, 10))) {
      return callback(new Error(failureMessage));
    }

    if (response && response.statusCode !== 200) {
      return callback(new Error(`Unexpected status code ${response.statusCode}`));
    }

    return callback(null);
  });
};

const getList = function (userId, listId, parameters, options, callback) {
  const viewType = {
    issue: 'list',
    series: 'thumbs'
  };

  const type = options.type || config.defaultType;
  const urlParameters = _.extend({
    list: listId,
    list_option: type,
    user_id: userId,
    view: viewType[type] || 'thumbs',
    order: 'alpha-asc',
    publisher: getPublisherIds(options.publishers)
  }, parameters);
  const urlParameterString = queryString.stringify(urlParameters, { arrayFormat: 'bracket' });

  const url = `${getComicsUrl}?${urlParameterString}`;
  request.get(url, (error, response, body) => {
    if (error) {
      return callback(error);
    }

    if (response && response.statusCode !== 200) {
      return callback(new Error(`Unexpected status code ${response.statusCode}`));
    }

    let responseJson;
    try {
      responseJson = JSON.parse(body);
    } catch (e) {
      return callback(new Error('Unable to parse response'));
    }

    if (!_.isObject(responseJson) || !_.isString(responseJson.list)) {
      return callback(new Error('Unknown response format'));
    }

    const list = extractDataFrom(responseJson, options);
    return callback(null, list);
  });
};

const addToList = function (comicId, listId, callback) {
  const actionId = 1;
  const failureMessage = 'Unable to add comic to list';
  return modifyList(comicId, listId, actionId, failureMessage, callback);
};

const removeFromList = function (comicId, listId, callback) {
  const actionId = 0;
  const failureMessage = 'Unable to remove comic from list';
  return modifyList(comicId, listId, actionId, failureMessage, callback);
};

module.exports = {
  get: getList,
  add: addToList,
  remove: removeFromList
};
