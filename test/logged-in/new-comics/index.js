module.exports = function(lofcg) {
  describe("New Comics", function() {
    const newComicsDate = "2016-01-04";
    require("../../shared/new-comics/issues-list.spec")(lofcg, newComicsDate);
    require("../../shared/new-comics/series-list.spec")(lofcg, newComicsDate);
  });
};
