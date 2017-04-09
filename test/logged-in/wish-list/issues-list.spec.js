var _ = require('lodash');
var helpers = require('../../utils/helper-tests');
var allIssuesWishList = require('./test-data/all-issues-wish-list');

module.exports = function (lofcbg) {
  var additionalArgs = [];
  var confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcbg.wishList, additionalArgs);

  require('../../shared/wish-list/issues-list.spec')(lofcbg);

  describe('add issue to list', function () {
    describe('when valid issue id used', confirmEmptyFirst(function () {
      var addErr;

      beforeAll(function (done) {
        lofcbg.wishList.add(testIssueId, function (err) {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added issue', function (done) {
          lofcbg.wishList.get(editableUserId, function (err, wishList) {
            expect(err).toBeNull();
            expect(wishList.length).toBe(1);
            expect(wishList).toEqual(allIssuesWishList);
            _.each(wishList, function (comic) {
              expect(comic).toBeAComicIssue();
            });
            done();
          });
        });
      });

      describe('remove issue from list', function () {
        helpers.testRemovingFromList(lofcbg.wishList, testIssueId, additionalArgs);
      });
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcbg.wishList.add('foo', function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add comic to list');
          done();
        });
      });
    });
  });

  describe('remove issue from list', function () {
    describe('when removing issue that isn\'t in wish list', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcbg.wishList, testIssueId, additionalArgs);
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcbg.wishList.remove('foo', function (err) {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove comic from list');
          done();
        });
      });
    });
  });
};
