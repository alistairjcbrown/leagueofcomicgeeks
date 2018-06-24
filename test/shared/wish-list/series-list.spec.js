const _ = require('lodash');

module.exports = function (lofcg) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = _.extend({ publishers: ['Image Comics'] }, options);
  const sortedOptions = _.extend({ sort: 'desc' }, options);

  describe('get series list', function () {
    it('should provide no comics in wish list with an invalid user id', function (done) {
      lofcg.wishList.get('foo', options, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, options, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList).toMatchJsonSnapshot('all-series-wish-list');
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, filteredOptions, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList).toMatchJsonSnapshot('filtered-series-wish-list');
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a sorted list of comics from a users wish list', function (done) {
      lofcg.wishList.get(readonlyUserId, sortedOptions, (err, wishList) => {
        expect(err).toBeNull();
        expect(wishList).toMatchJsonSnapshot('sorted-series-wish-list');
        _.each(wishList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
