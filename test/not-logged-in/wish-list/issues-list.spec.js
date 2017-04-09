module.exports = function (lofcbg) {
  require('../../shared/wish-list/issues-list.spec')(lofcbg);

  describe('add issue to list', function () {
    it('should return error when adding to wish list without permission', function (done) {
      lofcbg.wishList.add(testIssueId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove issue from list', function () {
    it('should return error when removing to wish list without permission', function (done) {
      lofcbg.wishList.remove(testIssueId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
