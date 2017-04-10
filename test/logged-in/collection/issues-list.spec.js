var _ = require('lodash');
var helpers = require('../../utils/helper-tests');
var allIssuesCollection = require('./test-data/all-issues-collection');

module.exports = function (lofcg) {
  var additionalArgs = [];
  var confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.collection, additionalArgs);

  require('../../shared/collection/issues-list.spec')(lofcg);

  describe('add issue to list', function () {
    describe('when valid issue id used', confirmEmptyFirst(function () {
      var addErr;

      beforeAll(function (done) {
        lofcg.collection.add(testIssueId, function (err) {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added issue', function (done) {
          lofcg.collection.get(editableUserId, function (err, collection) {
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
        helpers.testRemovingFromList(lofcg.collection, testIssueId, additionalArgs);
      });
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcg.collection.add('foo', function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add comic to list');
          done();
        });
      });
    });
  });

  describe('remove issue from list', function () {
    describe('when removing issue that isn\'t in collection', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcg.collection, testIssueId, additionalArgs);
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcg.collection.remove('foo', function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove comic from list');
          done();
        });
      });
    });
  });
};
