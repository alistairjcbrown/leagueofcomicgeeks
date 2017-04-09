var _ = require('lodash');
var queryString = require('query-string');
var lofcg = require('../../');
var config = require('../../config');

var listIdMapping = {
  2: 'collection',
  1: 'pull-list',
  5: 'read-list',
  3: 'wish-list'
};

var getListName = function (listId) {
  return _.get(listIdMapping, listId, listId);
};

var createStandardObject = function (request) {
  if (request.method === 'POST' && _.has(request.form, 'list_id')) {
    var isBulk = (request.uri === '/comic/my_list_bulk');
    return {
      path: request.uri,
      list: getListName(request.form.list_id),
      type: isBulk ? lofcg.types.SERIES : lofcg.types.ISSUE,
      action: request.form.action,
      method: request.method
    };
  }

  if (request.method === 'GET' && request.uri.split('?').length > 1) {
    var urlPieces = request.uri.split('?');
    var path = urlPieces[0];
    var query = queryString.parse(urlPieces[1]);

    return {
      path: path,
      list: getListName(query.list),
      type: query.list_option,
      method: request.method
    };
  }

  return {
    path: request.uri,
    method: request.method
  };
};

module.exports = function (type, spy) {
  console.log('\n' + type + ' calls made (' + spy.callCount + ')');

  var mappedRequests = _.reduce(_.range(spy.callCount), function (mapping, callIndex) {
    var call = spy.getCall(callIndex);
    var data = createStandardObject(call.args[0]);
    var type = data.type || 'none';
    mapping[type] = (mapping[type] || []).concat(data);
    return mapping;
  }, {});

  _.forEach(['none', 'issue', 'series'], function (type) {
    var requests = mappedRequests[type] || [];
    console.log(' > ' + _.capitalize(type) + ': ' + requests.length + ' requests');
  });
};
