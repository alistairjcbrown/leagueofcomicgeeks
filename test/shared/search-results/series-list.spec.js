const _ = require('lodash');
const allSeriesBlackMagic = require('./test-data/all-series-black-magic');
const filteredSeriesBlackMagic = require('./test-data/filtered-series-black-magic');

module.exports = function (lofcg, searchTerm) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = _.extend({ publishers: ['Image Comics'] }, options);

  describe('get series list', function () {
    it('should provide no results for unknown search term', function (done) {
      lofcg.searchResults.get('foobarbaz', options, (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(0);
        expect(searchResults).toEqual([]);
        done();
      });
    });

    it('should provide results for known search term', function (done) {
      lofcg.searchResults.get(searchTerm, options, (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(8);
        expect(searchResults).toEqual(allSeriesBlackMagic);
        _.each(searchResults, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of new comics', function (done) {
      lofcg.searchResults.get(searchTerm, filteredOptions, (err, searchResults) => {
        expect(err).toBeNull();
        expect(searchResults.length).toBe(2);
        expect(searchResults).toEqual(filteredSeriesBlackMagic);
        _.each(searchResults, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
