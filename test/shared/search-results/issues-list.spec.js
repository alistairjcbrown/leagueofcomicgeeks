const _ = require('lodash');
const allIssuesSeductionOfTheInnocent = require('./test-data/all-issues-seduction-of-the-innocent');
const filteredIssuesSeductionOfTheInnocent = require('./test-data/filtered-issues-seduction-of-the-innocent');
const sortedIssuesSeductionOfTheInnocent = require('./test-data/sorted-issues-seduction-of-the-innocent');

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
        expect(searchResults.length).toBe(13);
        expect(searchResults).toEqual(allIssuesSeductionOfTheInnocent);
        _.each(searchResults, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of search results', function (done) {
      lofcg.searchResults.get(searchTerm, { publishers: ['Dynamite'] }, (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(5);
        expect(searchResults).toEqual(filteredIssuesSeductionOfTheInnocent);
        _.each(searchResults, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a sorted list of search results', function (done) {
      lofcg.searchResults.get(searchTerm, { sort: 'desc' }, (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(13);
        expect(searchResults).toEqual(sortedIssuesSeductionOfTheInnocent);
        _.each(searchResults, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });
};
