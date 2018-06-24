module.exports = function(lofcg) {
  describe("Wish List", function() {
    require("./issues-list.spec")(lofcg);
    require("./series-list.spec")(lofcg);
  });
};
