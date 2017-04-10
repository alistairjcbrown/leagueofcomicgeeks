var _ = require('lodash');
var allIssuesPullList = require('./test-data/all-issues-pull-list');
var filteredIssuesPullList = require('./test-data/filtered-issues-pull-list');

module.exports = function (lofcg, pullListDate) {
  describe('get issues list', function () {
    it('should provide no comics in pull list with an invalid user id', function (done) {
      lofcg.pullList.get('foo', pullListDate, function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBe(0);
        expect(pullList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users pull list', function (done) {
      lofcg.pullList.get(readonlyUserId, pullListDate, function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBe(2);
        expect(pullList).toEqual(allIssuesPullList);
        _.each(pullList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users pull list', function (done) {
      lofcg.pullList.get(readonlyUserId, pullListDate, { publishers: ['Image Comics'] }, function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBe(1);
        expect(pullList).toEqual(filteredIssuesPullList);
        _.each(pullList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should return an error when provided with an invalid date', function (done) {
      lofcg.pullList.get(readonlyUserId, 'foo', function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Invalid date value provided');
        done();
      });
    });
  });
};
