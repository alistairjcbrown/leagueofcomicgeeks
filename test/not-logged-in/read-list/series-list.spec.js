module.exports = function (lofcbg) {
  require('../../shared/read-list/series-list.spec')(lofcbg);

  describe('add series to list', function () {
    it('should return error when adding to read list without permission', function (done) {
      lofcbg.readList.add(testComicId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove series from list', function () {
    it('should return error when removing to read list without permission', function (done) {
      lofcbg.readList.remove(testComicId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
