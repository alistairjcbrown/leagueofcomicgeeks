const lofcg = require('../../');
const user = require('../utils/test-credentials');

module.exports = function () {
  describe('Logged In', () => {
    afterAll((done) => {
      lofcg.session.destroy(() => {
        done();
      });
    });

    beforeAll((done) => {
      lofcg.session.create(user.username, user.password, () => {
        done();
      });
    });

    it('has a valid log in session', (done) => {
      lofcg.session.validate((err, isValid) => {
        expect(err).toBeNull();
        expect(isValid).toBe(true);
        done();
      });
    });

    require('./new-comics')(lofcg);
    require('./search-results')(lofcg);
    require('./collection')(lofcg);
    require('./pull-list')(lofcg);
    require('./wish-list')(lofcg);
    require('./read-list')(lofcg);
  });
};
