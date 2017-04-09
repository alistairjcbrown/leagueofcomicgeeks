var _ = require('lodash');
var utils = require('./utils');
var allIssuesCollection = require('./test-data/all-issues-collection');

module.exports = function (lofcbg) {
  var additionalArgs = [];

  require('../../shared/collection/issues-list.spec')(lofcbg);

  describe('add issue to list', function () {
    describe('when valid issue id used', utils.confirmEmptyFirst(lofcbg, additionalArgs, function () {
      var addErr;

      beforeAll(function (done) {
        lofcbg.collection.add(testIssueId, function (err) {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added issue', function (done) {
          lofcbg.collection.get(editableUserId, function (err, collection) {
            expect(err).toBeNull();
            expect(collection.length).toBe(1);
            expect(collection).toEqual(allIssuesCollection);
            _.each(collection, function (comic) {
              expect(comic).toBeAComicIssue();
            });
            done();
          });
        });
      });

      describe('remove issue from list', function () {
        utils.testRemovingFromList(lofcbg, testIssueId, additionalArgs);
      });
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcbg.collection.add('foo', function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add comic to list');
          done();
        });
      });
    });
  });

  describe('remove issue from list', function () {
    describe('when removing issue that isn\'t in collection', utils.confirmEmptyFirst(lofcbg, additionalArgs, function () {
      utils.testRemovingFromList(lofcbg, testIssueId, additionalArgs);
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcbg.collection.remove('foo', function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove comic from list');
          done();
        });
      });
    });
  });
};
