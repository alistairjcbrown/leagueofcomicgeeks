const _ = require('lodash');
const helpers = require('../../utils/helper-tests');

module.exports = function (lofcg, pullListDate) {
  const testFutureSeriesId = 131521; // Henry Roscoe: Detective, Sort of
  const testFutureIssueId = 6146462; // Henry Roscoe: Detective, Sort of #2
  const pastPullListDate = '2015-08-26';
  const futurePullListDate = '2019-02-20';
  const removeAdditionalArgs = [{ type: lofcg.types.SERIES }];
  const historicalAdditionalArgs = [pastPullListDate].concat(removeAdditionalArgs);
  const futureAdditionalArgs = [futurePullListDate].concat(removeAdditionalArgs);

  require('../../shared/pull-list/series-list.spec')(lofcg, pullListDate);

  describe('subscribe future series and add to list', function () {
    const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.pullList, futureAdditionalArgs);

    describe('when valid series id used', confirmEmptyFirst(function () {
      let addErr;

      beforeAll(function (done) {
        lofcg.pullList.add(testFutureSeriesId, { type: lofcg.types.SERIES }, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain an issue from the previously added series', function (done) {
          lofcg.pullList.get(editableUserId, futurePullListDate, { type: lofcg.types.SERIES }, (err, pullList) => {
            expect(err).toBeNull();
            expect(pullList).toMatchJsonSnapshot('all-series-pull-list');
            _.each(pullList, (comic) => {
              expect(comic).toBeAComicSeries();
            });
            done();
          });
        });
      });

      describe('unsubscribe series from list', function () {
        let removeErr;

        beforeAll(function (done) {
          lofcg.pullList.remove(testFutureSeriesId, { type: lofcg.types.SERIES }, (err) => {
            removeErr = err;
            done();
          });
        });

        it('should not return an error', function () {
          expect(removeErr).toBeNull();
        });

        describe('getting list', function () {
          it('should not contain an issue from the previously added series', function (done) {
            lofcg.pullList.get(editableUserId, futurePullListDate, { type: lofcg.types.SERIES }, (err, pullList) => {
              expect(err).toBeNull();
              expect(pullList).toEqual([]);
              done();
            });
          });
        });

        describe('remove issue from list', function () {
          let removeIssueErr;

          beforeAll(function (done) {
            lofcg.pullList.remove(testFutureIssueId, (err) => {
              removeIssueErr = err;
              done();
            });
          });

          it('should not return an error', function () {
            expect(removeIssueErr).toBeNull();
          });

          it('should be empty pull list', function (done) {
            lofcg.pullList.get(editableUserId, pastPullListDate, { type: lofcg.types.SERIES }, (err, pullList) => {
              expect(err).toBeNull();
              expect(pullList).toEqual([]);
              done();
            });
          });
        });
      });
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcg.pullList.add('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to subscribe to series');
          done();
        });
      });
    });
  });

  describe('subscribe historical series', function () {
    const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.pullList, historicalAdditionalArgs);

    describe('when valid series id used', confirmEmptyFirst(function () {
      let addErr;

      beforeAll(function (done) {
        lofcg.pullList.add(testSeriesId, { type: lofcg.types.SERIES }, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should be empty and not added historical issues to pull list', function (done) {
          lofcg.pullList.get(editableUserId, pastPullListDate, { type: lofcg.types.SERIES }, (err, pullList) => {
            expect(err).toBeNull();
            expect(pullList).toEqual([]);
            done();
          });
        });
      });

      describe('remove series from list', function () {
        helpers.testRemovingFromList(lofcg.pullList, testSeriesId, {
          get: historicalAdditionalArgs,
          remove: removeAdditionalArgs
        });
      });
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcg.pullList.add('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to subscribe to series');
          done();
        });
      });
    });
  });

  describe('remove series from list', function () {
    const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.pullList, historicalAdditionalArgs);

    describe('when removing series that isn\'t in pull list', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcg.pullList, testSeriesId, {
        get: historicalAdditionalArgs,
        remove: removeAdditionalArgs
      });
    }));

    describe('when invalid series id used', function () {
      it('should not return an error', function (done) {
        lofcg.pullList.remove('foo', { type: lofcg.types.SERIES }, (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to unsubscribe from series');
          done();
        });
      });
    });
  });
};
