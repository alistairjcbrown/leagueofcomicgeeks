var _ = require('lodash');
var allSeriesCollection = require('./test-data/all-series-collection');
var filteredSeriesCollection = require('./test-data/filtered-series-collection');

module.exports = function (lofcg) {
  describe('get series list', function () {
    it('should provide no comics in collection with an invalid user id', function (done) {
      lofcg.collection.get('foo', { type: lofcg.types.SERIES }, function (err, collection) {
        expect(err).toBeNull();
        expect(collection.length).toBe(0);
        expect(collection).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users collection', function (done) {
      lofcg.collection.get(readonlyUserId, { type: lofcg.types.SERIES }, function (err, collection) {
        expect(err).toBeNull();
        expect(collection.length).toBe(3);
        expect(collection).toEqual(allSeriesCollection);
        _.each(collection, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users collection', function (done) {
      lofcg.collection.get(readonlyUserId, { type: lofcg.types.SERIES, publishers: ['Image Comics'] }, function (err, collection) {
        expect(err).toBeNull();
        expect(collection.length).toBe(1);
        expect(collection).toEqual(filteredSeriesCollection);
        _.each(collection, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
