var _ = require('lodash');

module.exports = function (objectString) {
  var sanitisedObjectString = _.trim(objectString.trim(), '{}')
    .trim()
    .replace(/'/g, '"')
    .replace(/\s/g, '')
    .replace(/,$/, '')
    .replace(/([^:,]+):/g, '"$1":');

  try {
    return JSON.parse('{' + sanitisedObjectString + '}');
  } catch(e) {
    return null;
  }
};
