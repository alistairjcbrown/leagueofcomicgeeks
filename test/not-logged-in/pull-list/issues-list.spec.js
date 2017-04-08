module.exports = function (lofcbg, pullListDate) {
  require('../../shared/pull-list/issues-list.spec')(lofcbg, pullListDate);

  describe('add issue to list', function () {
    it('should return error when adding to pull list without permission', function (done) {
      lofcbg.pullList.add(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove issue from list', function () {
    it('should return error when removing to pull list without permission', function (done) {
      lofcbg.pullList.remove(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
