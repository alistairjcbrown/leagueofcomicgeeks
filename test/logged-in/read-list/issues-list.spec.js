var _ = require('lodash');
var helpers = require('../../utils/helper-tests');
var allIssuesReadList = require('./test-data/all-issues-read-list');

module.exports = function (lofcbg) {
  var additionalArgs = [];
  var confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcbg.readList, additionalArgs);

  require('../../shared/read-list/issues-list.spec')(lofcbg);

  describe('add issue to list', function () {
    describe('when valid issue id used', confirmEmptyFirst(function () {
      var addErr;

      beforeAll(function (done) {
        lofcbg.readList.add(testIssueId, function (err) {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added issue', function (done) {
          lofcbg.readList.get(editableUserId, function (err, readList) {
            expect(err).toBeNull();
            expect(readList.length).toBe(1);
            expect(readList).toEqual(allIssuesReadList);
            _.each(readList, function (comic) {
              expect(comic).toBeAComicIssue();
            });
            done();
          });
        });
      });

      describe('remove issue from list', function () {
        helpers.testRemovingFromList(lofcbg.readList, testIssueId, additionalArgs);
      });
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcbg.readList.add('foo', function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add comic to list');
          done();
        });
      });
    });
  });

  describe('remove issue from list', function () {
    describe('when removing issue that isn\'t in read list', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcbg.readList, testIssueId, additionalArgs);
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcbg.readList.remove('foo', function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove comic from list');
          done();
        });
      });
    });
  });
};
