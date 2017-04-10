const _ = require('lodash');
const helpers = require('../../utils/helper-tests');
const allSeriesWishList = require('./test-data/all-series-wish-list');

module.exports = function (lofcg) {
  const additionalArgs = [{ type: lofcg.types.SERIES }];
  const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.wishList, additionalArgs);

  require('../../shared/wish-list/series-list.spec')(lofcg);

  describe('add series to list', () => {
    describe('when valid series id used', confirmEmptyFirst(() => {
      let addErr;

      beforeAll((done) => {
        lofcg.wishList.add(testSeriesId, { type: lofcg.types.SERIES }, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', () => {
        expect(addErr).toBeNull();
      });

      describe('getting list', () => {
        it('should contain the previously added series', (done) => {
          lofcg.wishList.get(editableUserId, { type: lofcg.types.SERIES }, (err, wishList) => {
            expect(err).toBeNull();
            expect(wishList.length).toBe(1);
            expect(wishList).toEqual(allSeriesWishList);
            _.each(wishList, (comic) => {
              expect(comic).toBeAComicSeries();
            });
            done();
          });
        });
      });

      describe('remove series from list', () => {
        helpers.testRemovingFromList(lofcg.wishList, testSeriesId, additionalArgs);
      });
    }));

    describe('when invalid series id used', () => {
      it('should not return an error', (done) => {
        lofcg.wishList.add('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add series to list');
          done();
        });
      });
    });
  });

  describe('remove series from list', () => {
    describe('when removing series that isn\'t in wish list', confirmEmptyFirst(() => {
      helpers.testRemovingFromList(lofcg.wishList, testSeriesId, additionalArgs);
    }));

    describe('when invalid series id used', () => {
      it('should not return an error', (done) => {
        lofcg.wishList.remove('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove series from list');
          done();
        });
      });
    });
  });
};
