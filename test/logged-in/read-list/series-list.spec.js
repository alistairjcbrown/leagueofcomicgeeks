var _ = require('lodash');
var helpers = require('../../utils/helper-tests');
var allSeriesReadList = require('./test-data/all-series-read-list');

module.exports = function (lofcbg) {
  var additionalArgs = [{ type: lofcbg.types.SERIES }];
  var confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcbg.readList, additionalArgs);

  require('../../shared/read-list/series-list.spec')(lofcbg);

  fdescribe('add series to list', function () {
    describe('when valid series id used', confirmEmptyFirst(function () {
      var addErr;

      beforeAll(function (done) {
        lofcbg.readList.add(testSeriesId, { type: lofcbg.types.SERIES }, function (err) {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added series', function (done) {
          lofcbg.readList.get(editableUserId, { type: lofcbg.types.SERIES }, function (err, readList) {
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
        helpers.testRemovingFromList(lofcbg.readList, testSeriesId, additionalArgs);
      });
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcbg.readList.add('foo', { type: lofcbg.types.SERIES }, function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add series to list');
          done();
        });
      });
    });
  });

  describe('remove series from list', function () {
    describe('when removing series that isn\'t in read list', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcbg.readList, testSeriesId, additionalArgs);
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcbg.readList.remove('foo', { type: lofcbg.types.SERIES }, function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove series from list');
          done();
        });
      });
    });
  });
};
