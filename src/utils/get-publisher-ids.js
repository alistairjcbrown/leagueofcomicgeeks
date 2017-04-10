const _ = require('lodash');
const publishers = require('./publishers');

module.exports = function (publisherNames) {
  if (!_.isArray(publisherNames)) return [];

  return _.compact(_.map(publisherNames, publisherName => publishers[publisherName]));
};
