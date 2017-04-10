const _ = require('lodash');
const helpers = require('../../utils/helper-tests');
const allSeriesCollection = require('./test-data/all-series-collection');

module.exports = function (lofcg) {
  const additionalArgs = [{ type: lofcg.types.SERIES }];
  const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.wishList, additionalArgs);

  require('../../shared/collection/series-list.spec')(lofcg);

  describe('add series to list', () => {
    describe('when valid series id used', confirmEmptyFirst(() => {
      let addErr;

      beforeAll((done) => {
        lofcg.collection.add(testSeriesId, { type: lofcg.types.SERIES }, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', () => {
        expect(addErr).toBeNull();
      });

      describe('getting list', () => {
        it('should contain the previously added series', (done) => {
          lofcg.collection.get(editableUserId, { type: lofcg.types.SERIES }, (err, collection) => {
            expect(err).toBeNull();
            expect(collection.length).toBe(1);
            expect(collection).toEqual(allSeriesCollection);
            _.each(collection, (comic) => {
              expect(comic).toBeAComicSeries();
            });
            done();
          });
        });
      });

      describe('remove series from list', () => {
        helpers.testRemovingFromList(lofcg.collection, testSeriesId, additionalArgs);
      });
    }));

    describe('when invalid series id used', () => {
      it('should not return an error', (done) => {
        lofcg.collection.add('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add series to list');
          done();
        });
      });
    });
  });

  describe('remove series from list', () => {
    describe('when removing series that isn\'t in collection', confirmEmptyFirst(() => {
      helpers.testRemovingFromList(lofcg.collection, testSeriesId, additionalArgs);
    }));

    describe('when invalid series id used', () => {
      it('should not return an error', (done) => {
        lofcg.collection.remove('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove series from list');
          done();
        });
      });
    });
  });
};
