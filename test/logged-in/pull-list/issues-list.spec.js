const _ = require('lodash');
const helpers = require('../../utils/helper-tests');

module.exports = function (lofcg, pullListDate) {
  const modificationPullListDate = '2017-04-05';
  const additionalArgs = [modificationPullListDate];
  const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.pullList, additionalArgs);

  require('../../shared/pull-list/issues-list.spec')(lofcg, pullListDate);

  describe('add issue to list', function () {
    describe('when valid issue id used', confirmEmptyFirst(function () {
      let addErr;

      beforeAll(function (done) {
        lofcg.pullList.add(testIssueId, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added issue', function (done) {
          lofcg.pullList.get(editableUserId, modificationPullListDate, (err, pullList) => {
            expect(err).toBeNull();
            expect(pullList).toMatchJsonSnapshot('all-issues-pull-list');
            _.each(pullList, (comic) => {
              expect(comic).toBeAComicIssue();
            });
            done();
          });
        });
      });

      describe('remove issue from list', function () {
        helpers.testRemovingFromList(lofcg.pullList, testIssueId, { get: additionalArgs });
      });
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcg.pullList.add('foo', (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add comic to list');
          done();
        });
      });
    });
  });

  describe('remove issue from list', function () {
    describe('when removing issue that isn\'t in pull list', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcg.pullList, testIssueId, { get: additionalArgs });
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcg.pullList.remove('foo', (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove comic from list');
          done();
        });
      });
    });
  });
};
