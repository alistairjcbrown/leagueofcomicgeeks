const _ = require('lodash');
const helpers = require('../../utils/helper-tests');

module.exports = function (lofcg) {
  const additionalArgs = [{ type: lofcg.types.SERIES }];
  const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.wishList, additionalArgs);

  require('../../shared/collection/series-list.spec')(lofcg);

  describe('add series to list', function () {
    describe('when valid series id used', confirmEmptyFirst(function () {
      let addErr;

      beforeAll(function (done) {
        lofcg.collection.add(testSeriesId, { type: lofcg.types.SERIES }, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added series', function (done) {
          lofcg.collection.get(editableUserId, { type: lofcg.types.SERIES }, (err, collection) => {
            expect(err).toBeNull();
            expect(collection).toMatchJsonSnapshot('all-series-collection');
            _.each(collection, (comic) => {
              expect(comic).toBeAComicSeries();
            });
            done();
          });
        });
      });

      describe('remove series from list', function () {
        helpers.testRemovingFromList(lofcg.collection, testSeriesId, additionalArgs);
      });
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcg.collection.add('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add series to list');
          done();
        });
      });
    });
  });

  describe('remove series from list', function () {
    describe('when removing series that isn\'t in collection', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcg.collection, testSeriesId, additionalArgs);
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcg.collection.remove('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove series from list');
          done();
        });
      });
    });
  });
};
