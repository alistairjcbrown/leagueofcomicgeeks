var _ = require('lodash');
var allSeriesWishList = require('./test-data/all-series-wish-list');
var filteredSeriesWishList = require('./test-data/filtered-series-wish-list');

module.exports = function (lofcg) {
  describe('get series list', function () {
    it('should provide no comics in wish list with an invalid user id', function (done) {
      lofcg.wishList.get('foo', { type: lofcg.types.SERIES }, function (err, wishList) {
        expect(err).toBeNull();
        expect(wishList.length).toBe(0);
        expect(wishList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, { type: lofcg.types.SERIES }, function (err, wishList) {
        expect(err).toBeNull();
        expect(wishList.length).toBe(4);
        expect(wishList).toEqual(allSeriesWishList);
        _.each(wishList, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, { type: lofcg.types.SERIES, publishers: ['Image Comics'] }, function (err, wishList) {
        expect(err).toBeNull();
        expect(wishList.length).toBe(2);
        expect(wishList).toEqual(filteredSeriesWishList);
        _.each(wishList, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
