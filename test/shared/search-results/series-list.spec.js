var _ = require('lodash');
var allSeriesBlackMagic = require('./test-data/all-series-black-magic');
var filteredSeriesBlackMagic = require('./test-data/filtered-series-black-magic');

module.exports = function (lofcg, searchTerm) {
  describe('get series list', function () {
    it('should provide no results for unknown search term', function (done) {
      lofcg.searchResults.get(undefined, 'foobarbaz', { type: lofcg.types.SERIES }, function (err, searchResults) {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(0);
        expect(searchResults).toEqual([]);
        done();
      });
    });

    it('should provide results for known search term', function (done) {
      lofcg.searchResults.get(undefined, searchTerm, { type: lofcg.types.SERIES }, function (err, searchResults) {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(8);
        expect(searchResults).toEqual(allSeriesBlackMagic);
        _.each(searchResults, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of new comics', function (done) {
      lofcg.searchResults.get(undefined, searchTerm, { type: lofcg.types.SERIES, publishers: ['Image Comics'] }, function (err, searchResults) {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(2);
        expect(searchResults).toEqual(filteredSeriesBlackMagic);
        _.each(searchResults, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
