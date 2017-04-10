/* eslint-disable no-console */
const _ = require('lodash');
const queryString = require('query-string');
const lofcg = require('../../');

const listIdMapping = {
  2: 'collection',
  1: 'pull-list',
  5: 'read-list',
  3: 'wish-list'
};

const getListName = function (listId) {
  return _.get(listIdMapping, listId, listId);
};

const createStandardObject = function (request) {
  if (request.method === 'POST' && _.has(request.form, 'list_id')) {
    const isBulk = (request.uri === '/comic/my_list_bulk');
    return {
      path: request.uri,
      list: getListName(request.form.list_id),
      type: isBulk ? lofcg.types.SERIES : lofcg.types.ISSUE,
      action: request.form.action,
      method: request.method
    };
  }

  if (request.method === 'GET' && request.uri.split('?').length > 1) {
    const urlPieces = request.uri.split('?');
    const path = urlPieces[0];
    const query = queryString.parse(urlPieces[1]);

    return {
      path,
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
  console.log(`\n${type} calls made (${spy.callCount})`);

  const mappedRequests = _.reduce(_.range(spy.callCount), (mapping, callIndex) => {
    const call = spy.getCall(callIndex);
    const data = createStandardObject(call.args[0]);
    const dataType = data.type || 'none';
    mapping[dataType] = (mapping[dataType] || []).concat(data); // eslint-disable-line no-param-reassign
    return mapping;
  }, {});

  _.forEach(['none', 'issue', 'series'], (dataType) => {
    const requests = mappedRequests[dataType] || [];
    console.log(` > ${_.capitalize(dataType)}: ${requests.length} requests`);
  });
};
