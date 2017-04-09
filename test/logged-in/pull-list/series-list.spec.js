var _ = require('lodash');
var helpers = require('../../utils/helper-tests');
var allSeriesPullList = require('./test-data/all-series-pull-list');

module.exports = function (lofcbg, pullListDate) {
  var testFutureSeriesId = 131521; // Henry Roscoe: Detective, Sort of
  var testFutureIssueId = 6146462; // Henry Roscoe: Detective, Sort of #2
  var historicalPullListDate = '2015-08-26';
  var futurePullListDate = '2017-10-04';
  var removeAdditionalArgs = [{ type: lofcbg.types.SERIES }];
  var historicalAdditionalArgs = [historicalPullListDate].concat(removeAdditionalArgs);
  var futureAdditionalArgs = [futurePullListDate].concat(removeAdditionalArgs);

  require('../../shared/pull-list/series-list.spec')(lofcbg, pullListDate);

  describe('subscribe future series and add to list', function () {
    var confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcbg.pullList, futureAdditionalArgs);

    describe('when valid series id used', confirmEmptyFirst(function () {
      var addErr;

      beforeAll(function (done) {
        lofcbg.pullList.add(testFutureSeriesId, { type: lofcbg.types.SERIES }, function (err) {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain an issue from the previously added series', function (done) {
          lofcbg.pullList.get(editableUserId, futurePullListDate, { type: lofcbg.types.SERIES }, function (err, pullList) {
            expect(err).toBeNull();
            expect(pullList.length).toBe(1);
            expect(pullList).toEqual(allSeriesPullList);
            _.each(pullList, function (comic) {
              expect(comic).toBeAComicSeries();
            });
            done();
          });
        });
      });

      describe('unsubscribe series from list', function () {
        var removeErr;

        beforeAll(function (done) {
          lofcbg.pullList.remove(testFutureSeriesId, { type: lofcbg.types.SERIES }, function (err) {
            removeErr = err;
            done();
          });
        });

        it('should not return an error', function () {
          expect(removeErr).toBeNull();
        });

        describe('getting list', function () {
          it('should still contain an issue from the previously added series', function (done) {
            lofcbg.pullList.get(editableUserId, futurePullListDate, { type: lofcbg.types.SERIES }, function (err, pullList) {
              expect(err).toBeNull();
              expect(pullList.length).toBe(1);
              expect(pullList).toEqual(allSeriesPullList);
              _.each(pullList, function (comic) {
                expect(comic).toBeAComicSeries();
              });
              done();
            });
          });
        });

        describe('remove issue from list', function () {
          var removeIssueErr;

          beforeAll(function (done) {
            lofcbg.pullList.remove(testFutureIssueId, function (err) {
              removeIssueErr = err;
              done();
            });
          });

          it('should not return an error', function () {
            expect(removeIssueErr).toBeNull();
          });

          it('should be empty pull list', function (done) {
            lofcbg.pullList.get(editableUserId, historicalPullListDate, { type: lofcbg.types.SERIES }, function (err, pullList) {
              expect(err).toBeNull();
              expect(pullList.length).toBe(0);
              expect(pullList).toEqual([]);
              done();
            });
          });
        });
      });
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcbg.pullList.add('foo', { type: lofcbg.types.SERIES }, function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to subscribe to series');
          done();
        });
      });
    });
  });

  describe('subscribe historical series', function () {
    var confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcbg.pullList, historicalAdditionalArgs);

    describe('when valid series id used', confirmEmptyFirst(function () {
      var addErr;

      beforeAll(function (done) {
        lofcbg.pullList.add(testSeriesId, { type: lofcbg.types.SERIES }, function (err) {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should be empty and not added historical issues to pull list', function (done) {
          lofcbg.pullList.get(editableUserId, historicalPullListDate, { type: lofcbg.types.SERIES }, function (err, pullList) {
            expect(err).toBeNull();
            expect(pullList.length).toBe(0);
            expect(pullList).toEqual([]);
            done();
          });
        });
      });

      describe('remove series from list', function () {
        helpers.testRemovingFromList(lofcbg.pullList, testSeriesId, { get: historicalAdditionalArgs, remove: removeAdditionalArgs });
      });
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcbg.pullList.add('foo', { type: lofcbg.types.SERIES }, function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to subscribe to series');
          done();
        });
      });
    });
  });

  describe('remove series from list', function () {
    var confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcbg.pullList, historicalAdditionalArgs);

    describe('when removing series that isn\'t in pull list', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcbg.pullList, testSeriesId, { get: historicalAdditionalArgs, remove: removeAdditionalArgs });
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcbg.pullList.remove('foo', { type: lofcbg.types.SERIES }, function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to unsubscribe from series');
          done();
        });
      });
    });
  });
};
