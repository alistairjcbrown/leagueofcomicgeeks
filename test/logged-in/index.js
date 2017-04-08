var lofcbg = require('../../');
var user = require('../utils/test-credentials');

module.exports = function () {
  describe('Logged In', function () {
    afterAll(function (done) {
      lofcbg.session.destroy(function () {
        done();
      });
    });

    beforeAll(function (done) {
      lofcbg.session.create(user.username, user.password, function () {
        done();
      });
    });

    it('has a valid log in session', function (done) {
      lofcbg.session.validate(function (err, isValid) {
        expect(err).toBeNull();
        expect(isValid).toBe(true);
        done();
      });
    });

    require('./new-comics')(lofcbg);
    require('./search-results')(lofcbg);
    require('./collection')(lofcbg);
    require('./pull-list')(lofcbg);
    require('./wish-list')(lofcbg);
    require('./read-list')(lofcbg);
  });
};
