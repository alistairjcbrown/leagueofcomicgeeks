const _ = require("lodash");

module.exports = function(lofcg, searchTerm) {
  describe("get issues list", function() {
    it("should provide no results for unknown search term", function(done) {
      lofcg.searchResults.get("foobarbaz", (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults).toEqual([]);
        done();
      });
    });

    it("should provide results for known search term", function(done) {
      lofcg.searchResults.get(searchTerm, (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults).toMatchJsonSnapshot(
          "all-issues-seduction-of-the-innocent"
        );
        _.each(searchResults, comic => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it("should provide a filtered list of search results", function(done) {
      lofcg.searchResults.get(
        searchTerm,
        { publishers: ["Dynamite"] },
        (err, searchResults) => {
          expect(err).toBeNull();
          expect(searchResults).toMatchJsonSnapshot(
            "filtered-issues-seduction-of-the-innocent"
          );
          _.each(searchResults, comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });

    it("should provide a sorted list of search results", function(done) {
      lofcg.searchResults.get(
        searchTerm,
        { sort: lofcg.sort.DESCENDING },
        (err, searchResults) => {
          expect(err).toBeNull();
          expect(searchResults).toMatchJsonSnapshot(
            "sorted-issues-seduction-of-the-innocent"
          );
          _.each(searchResults, comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });
  });
};
