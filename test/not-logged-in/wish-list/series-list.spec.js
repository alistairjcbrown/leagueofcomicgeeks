module.exports = function (lofcg) {
  require('../../shared/wish-list/series-list.spec')(lofcg);

  describe('add series to list', () => {
    it('should return error when adding to wish list without permission', (done) => {
      lofcg.wishList.add(testIssueId, { type: lofcg.types.SERIES }, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove series from list', () => {
    it('should return error when removing to wish list without permission', (done) => {
      lofcg.wishList.remove(testIssueId, { type: lofcg.types.SERIES }, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
