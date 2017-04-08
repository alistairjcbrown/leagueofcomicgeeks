var _ = require('lodash');
var lofcbg = require('../../../');
var allSeriesWishList = require('./test-data/all-series-wish-list');
var filteredSeriesWishList = require('./test-data/filtered-series-wish-list');

module.exports = function () {
  describe('get series list', function () {
    it('should provide no comics in wish list with an invalid user id', function (done) {
      lofcbg.wishList.get('foo', { type: lofcbg.types.SERIES }, function (err, wishList) {
        expect(err).toBeNull();
        expect(wishList.length).toBe(0);
        expect(wishList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users wish list', function (done) {
      lofcbg.wishList.get(readonlyUserId, { type: lofcbg.types.SERIES }, function (err, wishList) {
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
      lofcbg.wishList.get(readonlyUserId, { type: lofcbg.types.SERIES, publishers: ['Image Comics'] }, function (err, wishList) {
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

  describe('add series to list', function () {
    it('should return error when adding to wish list without permission', function (done) {
      lofcbg.wishList.add(testComicId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove series from list', function () {
    it('should return error when removing to wish list without permission', function (done) {
      lofcbg.wishList.remove(testComicId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
