const _ = require("lodash");

module.exports = function(lofcg, pullListDate) {
  describe("get issues list", function() {
    it("should provide no comics in pull list with an invalid user id", function(done) {
      lofcg.pullList.get("foo", pullListDate, (err, pullList) => {
        expect(err).toBeNull();
        expect(pullList).toEqual([]);
        done();
      });
    });

    it("should provide a list of comics from a users pull list", function(done) {
      lofcg.pullList.get(readonlyUserId, pullListDate, (err, pullList) => {
        expect(err).toBeNull();
        expect(pullList).toMatchJsonSnapshot("all-issues-pull-list");
        _.each(pullList, comic => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it("should provide a filtered list of comics from a users pull list", function(done) {
      lofcg.pullList.get(
        readonlyUserId,
        pullListDate,
        { publishers: ["Image Comics"] },
        (err, pullList) => {
          expect(err).toBeNull();
          expect(pullList).toMatchJsonSnapshot("filtered-issues-pull-list");
          _.each(pullList, comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });

    it("should provide a sorted list of comics from a users pull list", function(done) {
      lofcg.pullList.get(
        readonlyUserId,
        pullListDate,
        { sort: "desc" },
        (err, pullList) => {
          expect(err).toBeNull();
          expect(pullList).toMatchJsonSnapshot("sorted-issues-pull-list");
          _.each(pullList, comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });

    it("should provide a custom sorted list of comics from a users pull list", function(done) {
      lofcg.pullList.get(
        readonlyUserId,
        pullListDate,
        { sort: "pulls" },
        (err, pullList) => {
          expect(err).toBeNull();
          // Custom sorting is the same order as descending
          expect(pullList).toMatchJsonSnapshot("sorted-issues-pull-list");
          _.each(pullList, comic => {
            expect(comic).toBeAComicIssue();
          });
          done();
        }
      );
    });

    it("should return an error when provided with an invalid date", function(done) {
      lofcg.pullList.get(readonlyUserId, "foo", err => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual("Invalid date value provided");
        done();
      });
    });
  });
};
