module.exports = function (lofcbg) {
  require('../../shared/read-list/issues-list.spec')(lofcbg);

  describe('add issue to list', function () {
    it('should return error when adding to read list without permission', function (done) {
      lofcbg.readList.add(testIssueId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove issue from list', function () {
    it('should return error when removing to read list without permission', function (done) {
      lofcbg.readList.remove(testIssueId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
