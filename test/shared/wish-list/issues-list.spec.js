const _ = require('lodash');

module.exports = function (lofcg) {
  describe('get issues list', function () {
    it('should provide no comics in wish list with an invalid user id', function (done) {
      lofcg.wishList.get('foo', (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList).toMatchJsonSnapshot('all-issues-wish-list');
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, { publishers: ['Image Comics'] }, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList).toMatchJsonSnapshot('filtered-issues-wish-list');
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a sorted list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, { sort: 'desc' }, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList).toMatchJsonSnapshot('sorted-issues-wish-list');
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });
};
