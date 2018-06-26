const _ = require("lodash");

module.exports = function(lofcg) {
  describe("get issues list", function() {
    it("should provide no comics in read list with an invalid user id", function(done) {
      lofcg.readList.get("foo", (err, readList) => {
        expect(err).toBeNull();
        expect(readList).toEqual([]);
        done();
      });
    });

    it("should provide a list of comics from a users read list", function(done) {
      lofcg.readList.get(readonlyUserId, (err, readList) => {
        expect(err).toBeNull();
        expect(readList).toMatchJsonSnapshot("all-issues-read-list");
        _.each(readList, comic => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it("should provide a filtered list of comics from a users read list", function(done) {
      lofcg.readList.get(
        readonlyUserId,
        { publishers: ["Image Comics"] },
        (err, readList) => {
          expect(err).toBeNull();
          expect(readList).toMatchJsonSnapshot("filtered-issues-read-list");
          _.each(readList, comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });

    it("should provide a sorted list of comics from a users read list", function(done) {
      lofcg.readList.get(
        readonlyUserId,
        { sort: lofcg.sort.DESCENDING },
        (err, readList) => {
          expect(err).toBeNull();
          expect(readList).toMatchJsonSnapshot("sorted-issues-read-list");
          _.each(readList, comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });
  });
};
