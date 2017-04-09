module.exports = function (lofcbg) {
  require('../../shared/collection/series-list.spec')(lofcbg);

  describe('add series to list', function () {
    it('should return error when adding to collection without permission', function (done) {
      lofcbg.collection.add(testIssueId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove series from list', function () {
    it('should return error when removing to collection without permission', function (done) {
      lofcbg.collection.remove(testIssueId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
