const _ = require("lodash");

module.exports = function(lofcg, newComicsDate) {
  describe("get issues list", function() {
    it("should provide no new comic", function(done) {
      lofcg.newComics.get("1966-01-01", (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics).toEqual([]);
        done();
      });
    });

    it("should provide a list of new comics", function(done) {
      lofcg.newComics.get(newComicsDate, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics).toMatchJsonSnapshot("all-issues-2016-01-04");
        _.each(newComics, comic => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it("should provide a filtered list of new comics by publisher", function(done) {
      lofcg.newComics.get(
        newComicsDate,
        { publishers: ["Image Comics"] },
        (err, newComics) => {
          expect(err).toBeNull();
          expect(newComics).toMatchJsonSnapshot("filtered-issues-2016-01-04");
          _.each(newComics, comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });

    it("should provide a filtered list of new comics of only first issues", function(done) {
      lofcg.newComics.get(
        newComicsDate,
        { filter: [lofcg.filters.FIRST_ISSUES] },
        (err, newComics) => {
          expect(err).toBeNull();
          expect(newComics).toMatchJsonSnapshot("first-issues-2016-01-04");
          _.each(newComics, comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });

    it("should provide a sorted list of new comics", function(done) {
      lofcg.newComics.get(
        newComicsDate,
        { sort: lofcg.sort.DESCENDING },
        (err, newComics) => {
          expect(err).toBeNull();
          expect(newComics).toMatchJsonSnapshot("sorted-issues-2016-01-04");
          _.each(newComics, comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });

    it("should return an error when provided with an invalid date", function(done) {
      lofcg.newComics.get("foo", err => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual("Invalid date value provided");
        done();
      });
    });
  });
};
