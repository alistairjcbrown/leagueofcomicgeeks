var _ = require('lodash');
var lofcbg = require('../../../');
var allIssuesBlackMagic = require('./test-data/all-issues-black-magic');
var filteredIssuesBlackMagic = require('./test-data/filtered-issues-black-magic');

module.exports = function (searchTerm) {
  describe('get issues list', function () {
    it('should provide no results for unknown search term', function (done) {
      lofcbg.searchResults.get(undefined, 'foobarbaz', function (err, searchResults) {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(0);
        expect(searchResults).toEqual([]);
        done();
      });
    });

    it('should provide results for known search term', function (done) {
      lofcbg.searchResults.get(undefined, searchTerm, function (err, searchResults) {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(38);
        expect(searchResults).toEqual(allIssuesBlackMagic);
        _.each(searchResults, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of new comics', function (done) {
      lofcbg.searchResults.get(undefined, searchTerm, { publishers: ['Image Comics'] }, function (err, searchResults) {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(15);
        expect(searchResults).toEqual(filteredIssuesBlackMagic);
        _.each(searchResults, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });
};
