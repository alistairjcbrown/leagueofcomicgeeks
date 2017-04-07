var _ = require('lodash');
var lofcbg = require('../../../');

module.exports = function () {
  describe('get issues list', function () {
    it('should provide no comics in wish list with an invalid user id', function (done) {
      lofcbg.wishList.get('foo', function (err, wishList) {
        expect(err).toBeNull();
        expect(wishList.length).toBe(0);
        expect(wishList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users wish list', function (done) {
      lofcbg.wishList.get(testUserId2, function (err, wishList) {
        expect(err).toBeNull();
        expect(wishList.length).toBeGreaterThan(0);
        _.each(wishList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users wish list', function (done) {
      lofcbg.wishList.get(testUserId2, { publishers: ['Image Comics'] }, function (err, wishList) {
        expect(err).toBeNull();
        expect(wishList.length).toBeGreaterThan(0);
        _.each(wishList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });

  describe('add issue to list', function () {
    it('should return error when adding to wish list without permission', function (done) {
      lofcbg.wishList.add(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove issue from list', function () {
    it('should return error when removing to wish list without permission', function (done) {
      lofcbg.wishList.remove(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
