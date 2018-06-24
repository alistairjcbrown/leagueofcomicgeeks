module.exports = function(lofcg) {
  describe("Read List", function() {
    require("./issues-list.spec")(lofcg);
    require("./series-list.spec")(lofcg);
  });
};
