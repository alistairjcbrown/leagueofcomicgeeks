var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var authentication = require('./authentication');

var url = 'http://leagueofcomicgeeks.com/comic/my_list_move';

var modifyList = function (comicId, listId, actionId, failureMessage, callback) {
  var user = authentication.get()
  if (!_.isObject(user) || _.isNull(user)) {
    return callback(new Error('Not authenticated'));
  }

  var data = {
    comic_id: comicId,
    list_id: listId,
    action_id: actionId
  };

  request.post({ url: url, form: data, jar: authentication.cookieJar }, function (error, response, body) {
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

var getList = function (listId, userId, callback) {
  if (_.isFunction(userId) && _.isUndefined(callback)) {
    var user = authentication.get()
    if (!_.isObject(user) || _.isNull(user)) {
      return callback(new Error('Not authenticated'));
    }
    callback = userId;
    userId = user.id;
  }

  var url = 'http://leagueofcomicgeeks.com/comic/get_comics?addons=1&list=' + listId + '&list_option=series&user_id=' + userId + '&view=list&order=alpha-asc'
  request.get({ url: url, jar: authentication.cookieJar }, function (error, response, body) {
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

    var $ = cheerio.load(responseJson.list);
    var wishList = $('li').map(function () {
      var $name = $(this).find('.name a');
      var cover = $(this).find('.cover img').attr('data-original');
      var count = parseInt($(this).find('.details').text().trim(), 10);
      var series = $(this).find('.series').text().trim();
      var publisher = $(this).find('.publisher').text().trim();

      return {
        id: $name.attr('data-id'),
        name: $name.text().trim(),
        cover: cover,
        count: count,
        series: series,
        publisher: publisher
      };
    }).get();

    callback(null, wishList);
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
