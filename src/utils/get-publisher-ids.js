var _ = require('lodash');
var publishers = require('./publishers');

module.exports = function (publisherNames) {
  if (!_.isArray(publisherNames)) return [];

  return _.compact(_.map(publisherNames, function (publisherName) {
    return publishers[publisherName];
  }));
};
