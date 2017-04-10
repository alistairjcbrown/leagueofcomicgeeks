const _ = require('lodash');
const helpers = require('../../utils/helper-tests');
const allIssuesWishList = require('./test-data/all-issues-wish-list');

module.exports = function (lofcg) {
  const additionalArgs = [];
  const confirmEmptyFirst = _.partial(helpers.confirmEmptyFirst, lofcg.wishList, additionalArgs);

  require('../../shared/wish-list/issues-list.spec')(lofcg);

  describe('add issue to list', () => {
    describe('when valid issue id used', confirmEmptyFirst(() => {
      let addErr;

      beforeAll((done) => {
        lofcg.wishList.add(testIssueId, (err) => {
          addErr = err;
          done();
        });
      });

      it('should not return an error', () => {
        expect(addErr).toBeNull();
      });

      describe('getting list', () => {
        it('should contain the previously added issue', (done) => {
          lofcg.wishList.get(editableUserId, (err, wishList) => {
            expect(err).toBeNull();
            expect(wishList.length).toBe(1);
            expect(wishList).toEqual(allIssuesWishList);
            _.each(wishList, (comic) => {
              expect(comic).toBeAComicIssue();
            });
            done();
          });
        });
      });

      describe('remove issue from list', () => {
        helpers.testRemovingFromList(lofcg.wishList, testIssueId, additionalArgs);
      });
    }));

    describe('when invalid issue id used', () => {
      it('should not return an error', (done) => {
        lofcg.wishList.add('foo', (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to add comic to list');
          done();
        });
      });
    });
  });

  describe('remove issue from list', () => {
    describe('when removing issue that isn\'t in wish list', confirmEmptyFirst(() => {
      helpers.testRemovingFromList(lofcg.wishList, testIssueId, additionalArgs);
    }));

    describe('when invalid issue id used', () => {
      it('should not return an error', (done) => {
        lofcg.wishList.remove('foo', (err) => {
          expect(err).toEqual(jasmine.any(Error));
          expect(err.message).toEqual('Unable to remove comic from list');
          done();
        });
      });
    });
  });
};
