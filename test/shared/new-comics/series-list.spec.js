const _ = require('lodash');
const allSeries20170104 = require('./test-data/all-series-2017-01-04');
const filteredSeries20170104 = require('./test-data/filtered-series-2017-01-04');

module.exports = function (lofcg, newComicsDate) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = _.extend({ publishers: ['Image Comics'] }, options);

  describe('get series list', () => {
    it('should provide no new comic series', (done) => {
      lofcg.newComics.get(undefined, '2017-01-01', options, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(0);
        expect(newComics).toEqual([]);
        done();
      });
    });

    it('should provide a list of new comic series', (done) => {
      lofcg.newComics.get(undefined, newComicsDate, options, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(139);
        expect(newComics).toEqual(allSeries20170104);
        _.each(newComics, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of new comic series', (done) => {
      lofcg.newComics.get(undefined, newComicsDate, filteredOptions, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(8);
        expect(newComics).toEqual(filteredSeries20170104);
        _.each(newComics, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should return an error when provided with an invalid date', (done) => {
      lofcg.newComics.get(undefined, 'foo', options, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Invalid date value provided');
        done();
      });
    });
  });
};
