module.exports = function (lofcg, pullListDate) {
  require('../../shared/pull-list/series-list.spec')(lofcg, pullListDate);

  describe('add series to list', function () {
    it('should return error when adding to pull list without permission', function (done) {
      lofcg.pullList.add(testIssueId, { type: lofcg.types.SERIES }, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove series from list', function () {
    it('should return error when removing to pull list without permission', function (done) {
      lofcg.pullList.remove(testIssueId, { type: lofcg.types.SERIES }, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
