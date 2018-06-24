const lofcg = require("../../");
const user = require("../utils/test-credentials");

module.exports = function() {
  describe("Logged In", function() {
    afterAll(function(done) {
      lofcg.session.destroy(() => {
        done();
      });
    });

    beforeAll(function(done) {
      lofcg.session.create(user.username, user.password, () => {
        done();
      });
    });

    it("has a valid log in session", function(done) {
      lofcg.session.validate((err, isValid) => {
        expect(err).toBeNull();
        expect(isValid).toBe(true);
        done();
      });
    });

    require("./new-comics")(lofcg);
    require("./search-results")(lofcg);
    require("./collection")(lofcg);
    require("./pull-list")(lofcg);
    require("./wish-list")(lofcg);
    require("./read-list")(lofcg);
  });
};
