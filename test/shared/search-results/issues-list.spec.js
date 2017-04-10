const _ = require('lodash');
const allIssuesBlackMagic = require('./test-data/all-issues-black-magic');
const filteredIssuesBlackMagic = require('./test-data/filtered-issues-black-magic');

module.exports = function (lofcg, searchTerm) {
  describe('get issues list', function () {
    it('should provide no results for unknown search term', function (done) {
      lofcg.searchResults.get('foobarbaz', (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(0);
        expect(searchResults).toEqual([]);
        done();
      });
    });

    it('should provide results for known search term', function (done) {
      lofcg.searchResults.get(searchTerm, (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(38);
        expect(searchResults).toEqual(allIssuesBlackMagic);
        _.each(searchResults, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of new comics', function (done) {
      lofcg.searchResults.get(searchTerm, { publishers: ['Image Comics'] }, (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(15);
        expect(searchResults).toEqual(filteredIssuesBlackMagic);
        _.each(searchResults, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });
};
