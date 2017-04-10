const _ = require('lodash');
const helpers = require('../../utils/helper-tests');
const allSeriesReadList = require('./test-data/all-series-read-list');

module.exports = function (lofcg) {
  const additionalArgs = [{ type: lofcg.types.SERIES }];
  const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.readList, additionalArgs);

  require('../../shared/read-list/series-list.spec')(lofcg);

  describe('add series to list', () => {
    describe('when valid series id used', confirmEmptyFirst(() => {
      let addErr;

      beforeAll((done) => {
        lofcg.readList.add(testSeriesId, { type: lofcg.types.SERIES }, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', () => {
        expect(addErr).toBeNull();
      });

      describe('getting list', () => {
        it('should contain the previously added series', (done) => {
          lofcg.readList.get(editableUserId, { type: lofcg.types.SERIES }, (err, readList) => {
            expect(err).toBeNull();
            expect(readList.length).toBe(1);
            expect(readList).toEqual(allSeriesReadList);
            _.each(readList, (comic) => {
              expect(comic).toBeAComicSeries();
            });
            done();
          });
        });
      });

      describe('remove series from list', () => {
        helpers.testRemovingFromList(lofcg.readList, testSeriesId, additionalArgs);
      });
    }));

    describe('when invalid series id used', () => {
      it('should not return an error', (done) => {
        lofcg.readList.add('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add series to list');
          done();
        });
      });
    });
  });

  describe('remove series from list', () => {
    describe('when removing series that isn\'t in read list', confirmEmptyFirst(() => {
      helpers.testRemovingFromList(lofcg.readList, testSeriesId, additionalArgs);
    }));

    describe('when invalid series id used', () => {
      it('should not return an error', (done) => {
        lofcg.readList.remove('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove series from list');
          done();
        });
      });
    });
  });
};
