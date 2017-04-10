const _ = require('lodash');
const allIssuesReadList = require('./test-data/all-issues-read-list');
const filteredIssuesReadList = require('./test-data/filtered-issues-read-list');

module.exports = function (lofcg) {
  describe('get issues list', () => {
    it('should provide no comics in read list with an invalid user id', (done) => {
      lofcg.readList.get('foo', (err, readList) => {
        expect(err).toBeNull();
        expect(readList.length).toBe(0);
        expect(readList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users read list', (done) => {
      lofcg.readList.get(readonlyUserId, (err, readList) => {
        expect(err).toBeNull();
        expect(readList.length).toBe(34);
        expect(readList).toEqual(allIssuesReadList);
        _.each(readList, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users read list', (done) => {
      lofcg.readList.get(readonlyUserId, { publishers: ['Image Comics'] }, (err, readList) => {
        expect(err).toBeNull();
        expect(readList.length).toBe(13);
        expect(readList).toEqual(filteredIssuesReadList);
        _.each(readList, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });
};
