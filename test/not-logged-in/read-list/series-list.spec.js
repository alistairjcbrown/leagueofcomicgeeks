module.exports = function (lofcg) {
  require('../../shared/read-list/series-list.spec')(lofcg);

  describe('add series to list', function () {
    it('should return error when adding to read list without permission', function (done) {
      lofcg.readList.add(testIssueId, { type: lofcg.types.SERIES }, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove series from list', function () {
    it('should return error when removing to read list without permission', function (done) {
      lofcg.readList.remove(testIssueId, { type: lofcg.types.SERIES }, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
