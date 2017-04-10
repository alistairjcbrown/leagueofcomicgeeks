const _ = require('lodash');
const allSeries20170104 = require('./test-data/all-series-2017-01-04');
const filteredSeries20170104 = require('./test-data/filtered-series-2017-01-04');
const sortedSeries20170104 = require('./test-data/sorted-series-2017-01-04');

module.exports = function (lofcg, newComicsDate) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = _.extend({ publishers: ['Image Comics'] }, options);
  const sortedOptions = _.extend({ sort: 'desc' }, options);

  describe('get series list', function () {
    it('should provide no new comic series', function (done) {
      lofcg.newComics.get('2017-01-01', options, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(0);
        expect(newComics).toEqual([]);
        done();
      });
    });

    it('should provide a list of new comic series', function (done) {
      lofcg.newComics.get(newComicsDate, options, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(139);
        expect(newComics).toEqual(allSeries20170104);
        _.each(newComics, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of new comic series', function (done) {
      lofcg.newComics.get(newComicsDate, filteredOptions, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(8);
        expect(newComics).toEqual(filteredSeries20170104);
        _.each(newComics, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a sorted list of new comic series', function (done) {
      lofcg.newComics.get(newComicsDate, sortedOptions, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(139);
        expect(newComics).toEqual(sortedSeries20170104);
        _.each(newComics, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should return an error when provided with an invalid date', function (done) {
      lofcg.newComics.get('foo', options, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Invalid date value provided');
        done();
      });
    });
  });
};
