const _ = require('lodash');
const helpers = require('../../utils/helper-tests');
const allIssuesPullList = require('./test-data/all-issues-pull-list');

module.exports = function (lofcg, pullListDate) {
  const modificationPullListDate = '2017-04-05';
  const additionalArgs = [modificationPullListDate];
  const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.pullList, additionalArgs);

  require('../../shared/pull-list/issues-list.spec')(lofcg, pullListDate);

  describe('add issue to list', () => {
    describe('when valid issue id used', confirmEmptyFirst(() => {
      let addErr;

      beforeAll((done) => {
        lofcg.pullList.add(testIssueId, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', () => {
        expect(addErr).toBeNull();
      });

      describe('getting list', () => {
        it('should contain the previously added issue', (done) => {
          lofcg.pullList.get(editableUserId, modificationPullListDate, (err, pullList) => {
            expect(err).toBeNull();
            expect(pullList.length).toBe(1);
            expect(pullList).toEqual(allIssuesPullList);
            _.each(pullList, (comic) => {
              expect(comic).toBeAComicIssue();
            });
            done();
          });
        });
      });

      describe('remove issue from list', () => {
        helpers.testRemovingFromList(lofcg.pullList, testIssueId, { get: additionalArgs });
      });
    }));

    describe('when invalid issue id used', () => {
      it('should not return an error', (done) => {
        lofcg.pullList.add('foo', (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add comic to list');
          done();
        });
      });
    });
  });

  describe('remove issue from list', () => {
    describe('when removing issue that isn\'t in pull list', confirmEmptyFirst(() => {
      helpers.testRemovingFromList(lofcg.pullList, testIssueId, { get: additionalArgs });
    }));

    describe('when invalid issue id used', () => {
      it('should not return an error', (done) => {
        lofcg.pullList.remove('foo', (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove comic from list');
          done();
        });
      });
    });
  });
};
