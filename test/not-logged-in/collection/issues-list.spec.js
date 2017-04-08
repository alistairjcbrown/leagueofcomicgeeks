module.exports = function (lofcbg) {
  require('../../shared/collection/issues-list.spec')(lofcbg);

  describe('add issue to list', function () {
    it('should return error when adding to collection without permission', function (done) {
      lofcbg.collection.add(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove issue from list', function () {
    it('should return error when removing to collection without permission', function (done) {
      lofcbg.collection.remove(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
