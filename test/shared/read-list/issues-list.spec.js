var _ = require('lodash');
var allIssuesReadList = require('./test-data/all-issues-read-list');
var filteredIssuesReadList = require('./test-data/filtered-issues-read-list');

module.exports = function (lofcg) {
  describe('get issues list', function () {
    it('should provide no comics in read list with an invalid user id', function (done) {
      lofcg.readList.get('foo', function (err, readList) {
        expect(err).toBeNull();
        expect(readList.length).toBe(0);
        expect(readList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users read list', function (done) {
      lofcg.readList.get(readonlyUserId, function (err, readList) {
        expect(err).toBeNull();
        expect(readList.length).toBe(34);
        expect(readList).toEqual(allIssuesReadList);
        _.each(readList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users read list', function (done) {
      lofcg.readList.get(readonlyUserId, { publishers: ['Image Comics'] }, function (err, readList) {
        expect(err).toBeNull();
        expect(readList.length).toBe(13);
        expect(readList).toEqual(filteredIssuesReadList);
        _.each(readList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });
};
