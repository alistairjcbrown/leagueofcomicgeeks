module.exports = function (lofcg) {
  require('../../shared/collection/issues-list.spec')(lofcg);

  describe('add issue to list', () => {
    it('should return error when adding to collection without permission', (done) => {
      lofcg.collection.add(testIssueId, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove issue from list', () => {
    it('should return error when removing to collection without permission', (done) => {
      lofcg.collection.remove(testIssueId, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
