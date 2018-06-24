const lofcg = require("../../");

module.exports = function() {
  describe("Not Logged In", function() {
    require("./new-comics")(lofcg);
    require("./search-results")(lofcg);
    require("./collection")(lofcg);
    require("./pull-list")(lofcg);
    require("./wish-list")(lofcg);
    require("./read-list")(lofcg);
  });
};
