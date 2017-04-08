var _ = require('lodash');
var allIssuesWishList = require('./test-data/all-issues-wish-list');
var filteredIssuesWishList = require('./test-data/filtered-issues-wish-list');

module.exports = function (lofcbg) {
  describe('get issues list', function () {
    it('should provide no comics in wish list with an invalid user id', function (done) {
      lofcbg.wishList.get('foo', function (err, wishList) {
        expect(err).toBeNull();
        expect(wishList.length).toBe(0);
        expect(wishList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users wish list', function (done) {
      lofcbg.wishList.get(readonlyUserId, function (err, wishList) {
        expect(err).toBeNull();
        expect(wishList.length).toBe(16);
        expect(wishList).toEqual(allIssuesWishList);
        _.each(wishList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users wish list', function (done) {
      lofcbg.wishList.get(readonlyUserId, { publishers: ['Image Comics'] }, function (err, wishList) {
        expect(err).toBeNull();
        expect(wishList.length).toBe(11);
        expect(wishList).toEqual(filteredIssuesWishList);
        _.each(wishList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });
};
