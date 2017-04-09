var _ = require('lodash');
var helpers = require('../../utils/helper-tests');
var allIssuesPullList = require('./test-data/all-issues-pull-list');

module.exports = function (lofcbg, pullListDate) {
  var modificationPullListDate = '2017-04-05';
  var additionalArgs = [modificationPullListDate];
  var confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcbg.pullList, additionalArgs);

  require('../../shared/pull-list/issues-list.spec')(lofcbg, pullListDate);

  describe('add issue to list', function () {
    describe('when valid issue id used', confirmEmptyFirst(function () {
      var addErr;

      beforeAll(function (done) {
        lofcbg.pullList.add(testIssueId, function (err) {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added issue', function (done) {
          lofcbg.pullList.get(editableUserId, modificationPullListDate, function (err, pullList) {
            expect(err).toBeNull();
            expect(pullList.length).toBe(1);
            expect(pullList).toEqual(allIssuesPullList);
            _.each(pullList, function (comic) {
              expect(comic).toBeAComicIssue();
            });
            done();
          });
        });
      });

      describe('remove issue from list', function () {
        helpers.testRemovingFromList(lofcbg.pullList, testIssueId, { get: additionalArgs });
      });
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcbg.pullList.add('foo', function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add comic to list');
          done();
        });
      });
    });
  });

  describe('remove issue from list', function () {
    describe('when removing issue that isn\'t in pull list', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcbg.pullList, testIssueId, { get: additionalArgs });
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcbg.pullList.remove('foo', function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove comic from list');
          done();
        });
      });
    });
  });
};
