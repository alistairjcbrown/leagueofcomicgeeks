var _ = require('lodash');
var helpers = require('../../utils/helper-tests');
var allSeriesReadList = require('./test-data/all-series-read-list');

module.exports = function (lofcg) {
  var additionalArgs = [{ type: lofcg.types.SERIES }];
  var confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.readList, additionalArgs);

  require('../../shared/read-list/series-list.spec')(lofcg);

  describe('add series to list', function () {
    describe('when valid series id used', confirmEmptyFirst(function () {
      var addErr;

      beforeAll(function (done) {
        lofcg.readList.add(testSeriesId, { type: lofcg.types.SERIES }, function (err) {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added series', function (done) {
          lofcg.readList.get(editableUserId, { type: lofcg.types.SERIES }, function (err, readList) {
            expect(err).toBeNull();
            expect(readList.length).toBe(1);
            expect(readList).toEqual(allSeriesReadList);
            _.each(readList, function (comic) {
              expect(comic).toBeAComicSeries();
            });
            done();
          });
        });
      });

      describe('remove series from list', function () {
        helpers.testRemovingFromList(lofcg.readList, testSeriesId, additionalArgs);
      });
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcg.readList.add('foo', { type: lofcg.types.SERIES }, function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add series to list');
          done();
        });
      });
    });
  });

  describe('remove series from list', function () {
    describe('when removing series that isn\'t in read list', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcg.readList, testSeriesId, additionalArgs);
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcg.readList.remove('foo', { type: lofcg.types.SERIES }, function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove series from list');
          done();
        });
      });
    });
  });
};
