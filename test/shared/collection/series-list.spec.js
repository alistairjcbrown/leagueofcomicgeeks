const _ = require('lodash');
const allSeriesCollection = require('./test-data/all-series-collection');
const filteredSeriesCollection = require('./test-data/filtered-series-collection');
const sortedSeriesCollection = require('./test-data/sorted-series-collection');

module.exports = function (lofcg) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = _.extend({ publishers: ['Image Comics'] }, options);
  const sortedOptions = _.extend({ sort: 'desc' }, options);

  describe('get series list', function () {
    it('should provide no comics in collection with an invalid user id', function (done) {
      lofcg.collection.get('foo', options, (err, collection) => {
        expect(err).toBeNull();
        expect(collection.length).toBe(0);
        expect(collection).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users collection', function (done) {
      lofcg.collection.get(readonlyUserId, options, (err, collection) => {
        expect(err).toBeNull();
        expect(collection.length).toBe(3);
        expect(collection).toEqual(allSeriesCollection);
        _.each(collection, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users collection', function (done) {
      lofcg.collection.get(readonlyUserId, filteredOptions, (err, collection) => {
        expect(err).toBeNull();
        expect(collection.length).toBe(1);
        expect(collection).toEqual(filteredSeriesCollection);
        _.each(collection, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a sorted list of comics from a users collection', function (done) {
      lofcg.collection.get(readonlyUserId, sortedOptions, (err, collection) => {
        expect(err).toBeNull();
        expect(collection.length).toBe(3);
        expect(collection).toEqual(sortedSeriesCollection);
        _.each(collection, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
