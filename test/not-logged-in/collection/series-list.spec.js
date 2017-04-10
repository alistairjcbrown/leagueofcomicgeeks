module.exports = function (lofcg) {
  require('../../shared/collection/series-list.spec')(lofcg);

  describe('add series to list', function () {
    it('should return error when adding to collection without permission', function (done) {
      lofcg.collection.add(testIssueId, { type: lofcg.types.SERIES }, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove series from list', function () {
    it('should return error when removing to collection without permission', function (done) {
      lofcg.collection.remove(testIssueId, { type: lofcg.types.SERIES }, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
