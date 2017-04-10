const _ = require('lodash');
const allIssuesWishList = require('./test-data/all-issues-wish-list');
const filteredIssuesWishList = require('./test-data/filtered-issues-wish-list');
const sortedIssuesWishList = require('./test-data/sorted-issues-wish-list');

module.exports = function (lofcg) {
  describe('get issues list', function () {
    it('should provide no comics in wish list with an invalid user id', function (done) {
      lofcg.wishList.get('foo', (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList.length).toBe(0);
        expect(wishList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList.length).toBe(16);
        expect(wishList).toEqual(allIssuesWishList);
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, { publishers: ['Image Comics'] }, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList.length).toBe(11);
        expect(wishList).toEqual(filteredIssuesWishList);
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a sorted list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, { sort: 'desc' }, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList.length).toBe(16);
        expect(wishList).toEqual(sortedIssuesWishList);
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });
};
