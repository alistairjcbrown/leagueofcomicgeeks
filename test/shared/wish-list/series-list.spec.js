const _ = require('lodash');
const allSeriesWishList = require('./test-data/all-series-wish-list');
const filteredSeriesWishList = require('./test-data/filtered-series-wish-list');
const sortedSeriesWishList = require('./test-data/sorted-series-wish-list');

module.exports = function (lofcg) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = _.extend({ publishers: ['Image Comics'] }, options);
  const sortedOptions = _.extend({ sort: 'desc' }, options);

  describe('get series list', function () {
    it('should provide no comics in wish list with an invalid user id', function (done) {
      lofcg.wishList.get('foo', options, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList.length).toBe(0);
        expect(wishList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, options, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList.length).toBe(4);
        expect(wishList).toEqual(allSeriesWishList);
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, filteredOptions, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList.length).toBe(2);
        expect(wishList).toEqual(filteredSeriesWishList);
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a sorted list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, sortedOptions, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList.length).toBe(4);
        expect(wishList).toEqual(sortedSeriesWishList);
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
