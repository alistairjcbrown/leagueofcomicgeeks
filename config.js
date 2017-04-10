const types = require('./src/utils/types');

const protocol = 'http://';
const domain = 'leagueofcomicgeeks.com';

module.exports = {
  protocol,
  domain,
  rootUrl: `${protocol}${domain}`,
  sessionKey: 'ci_session',
  defaultType: types.SERIES
};
