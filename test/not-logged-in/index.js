var lofcbg = require('../../');

module.exports = function () {
  describe('Not Logged In', function () {
    require('./new-comics')(lofcbg);
    require('./search-results')(lofcbg);
    require('./collection')(lofcbg);
    require('./pull-list')(lofcbg);
    require('./wish-list')(lofcbg);
    require('./read-list')(lofcbg);
  });
};
