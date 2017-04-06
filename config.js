var types = require('./src/utils/types');
var protocol = 'http://';
var domain = 'leagueofcomicgeeks.com';

module.exports = {
  protocol: protocol,
  domain: domain,
  rootUrl: protocol + '' + domain,
  sessionKey: 'ci_session',
  defaultType: types.SERIES
};
