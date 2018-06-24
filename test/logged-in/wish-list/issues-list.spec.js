const _ = require('lodash');
const helpers = require('../../utils/helper-tests');

module.exports = function (lofcg) {
  const additionalArgs = [];
  const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.wishList, additionalArgs);

  require('../../shared/wish-list/issues-list.spec')(lofcg);

  describe('add issue to list', function () {
    describe('when valid issue id used', confirmEmptyFirst(function () {
      let addErr;

      beforeAll(function (done) {
        lofcg.wishList.add(testIssueId, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', function () {
        expect(addErr).toBeNull();
      });

      describe('getting list', function () {
        it('should contain the previously added issue', function (done) {
          lofcg.wishList.get(editableUserId, (err, wishList) => {
            expect(err).toBeNull();
            expect(wishList).toMatchJsonSnapshot('all-issues-wish-list');
            _.each(wishList, (comic) => {
              expect(comic).toBeAComicIssue();
            });
            done();
          });
        });
      });

      describe('remove issue from list', function () {
        helpers.testRemovingFromList(lofcg.wishList, testIssueId, additionalArgs);
      });
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcg.wishList.add('foo', (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add comic to list');
          done();
        });
      });
    });
  });

  describe('remove issue from list', function () {
    describe('when removing issue that isn\'t in wish list', confirmEmptyFirst(function () {
      helpers.testRemovingFromList(lofcg.wishList, testIssueId, additionalArgs);
    }));

    describe('when invalid issue id used', function () {
      it('should not return an error', function (done) {
        lofcg.wishList.remove('foo', (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove comic from list');
          done();
        });
      });
    });
  });
};
