const _ = require('lodash');
const helpers = require('../../utils/helper-tests');
const allIssuesReadList = require('./test-data/all-issues-read-list');

module.exports = function (lofcg) {
  const additionalArgs = [];
  const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.readList, additionalArgs);

  require('../../shared/read-list/issues-list.spec')(lofcg);

  describe('add issue to list', function () {
    describe('when valid issue id used', confirmEmptyFirst(function () {
      let addErr;

      beforeAll(function (done) {
        lofcg.readList.add(testIssueId, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added issue', function (done) {
          lofcg.readList.get(editableUserId, (err, readList) => {
            expect(err).toBeNull();
            expect(readList.length).toBe(1);
            expect(readList).toEqual(allIssuesReadList);
            _.each(readList, (comic) => {
              expect(comic).toBeAComicIssue();
            });
            done();
          });
        });
      });

      describe('remove issue from list', function () {
        helpers.testRemovingFromList(lofcg.readList, testIssueId, additionalArgs);
      });
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcg.readList.add('foo', (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add comic to list');
          done();
        });
      });
    });
  });

  describe('remove issue from list', function () {
    describe('when removing issue that isn\'t in read list', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcg.readList, testIssueId, additionalArgs);
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcg.readList.remove('foo', (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove comic from list');
          done();
        });
      });
    });
  });
};
