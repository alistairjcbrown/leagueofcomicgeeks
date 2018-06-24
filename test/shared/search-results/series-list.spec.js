const _ = require("lodash");

module.exports = function(lofcg, searchTerm) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = _.extend({ publishers: ["Dynamite"] }, options);
  const sortedOptions = _.extend({ sort: "desc" }, options);

  describe("get series list", function() {
    it("should provide no results for unknown search term", function(done) {
      lofcg.searchResults.get("foobarbaz", options, (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults).toEqual([]);
        done();
      });
    });

    it("should provide results for known search term", function(done) {
      lofcg.searchResults.get(searchTerm, options, (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults).toMatchJsonSnapshot(
          "all-series-seduction-of-the-innocent"
        );
        _.each(searchResults, comic => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it("should provide a filtered list of search results", function(done) {
      lofcg.searchResults.get(
        searchTerm,
        filteredOptions,
        (err, searchResults) => {
          expect(err).toBeNull();
          expect(searchResults).toMatchJsonSnapshot(
            "filtered-series-seduction-of-the-innocent"
          );
          _.each(searchResults, comic => {
            expect(comic).toBeAComicSeries();
          });
          done();
        }
      );
    });

    it("should provide a sorted list of search results", function(done) {
      lofcg.searchResults.get(
        searchTerm,
        sortedOptions,
        (err, searchResults) => {
          expect(err).toBeNull();
          expect(searchResults).toMatchJsonSnapshot(
            "sorted-series-seduction-of-the-innocent"
          );
          _.each(searchResults, comic => {
            expect(comic).toBeAComicSeries();
          });
          done();
        }
      );
    });
  });
};
