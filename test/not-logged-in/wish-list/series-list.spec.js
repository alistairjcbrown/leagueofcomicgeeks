module.exports = function (lofcbg) {
  require('../../shared/wish-list/series-list.spec')(lofcbg);

  describe('add series to list', function () {
    it('should return error when adding to wish list without permission', function (done) {
      lofcbg.wishList.add(testIssueId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove series from list', function () {
    it('should return error when removing to wish list without permission', function (done) {
      lofcbg.wishList.remove(testIssueId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
