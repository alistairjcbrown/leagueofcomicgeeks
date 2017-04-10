module.exports = function (lofcg, pullListDate) {
  require('../../shared/pull-list/issues-list.spec')(lofcg, pullListDate);

  describe('add issue to list', () => {
    it('should return error when adding to pull list without permission', (done) => {
      lofcg.pullList.add(testIssueId, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove issue from list', () => {
    it('should return error when removing to pull list without permission', (done) => {
      lofcg.pullList.remove(testIssueId, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
