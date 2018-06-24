module.exports = function(lofcg) {
  describe("Collection", function() {
    require("./issues-list.spec")(lofcg);
    require("./series-list.spec")(lofcg);
  });
};
