var _ = require('lodash');
var lofcbg = require('../../../');
var allSeriesCollection = require('./test-data/all-series-collection');
var filteredSeriesCollection = require('./test-data/filtered-series-collection');

module.exports = function () {
  describe('get series list', function () {
    it('should provide no comics in collection with an invalid user id', function (done) {
      lofcbg.collection.get('foo', { type: lofcbg.types.SERIES }, function (err, collection) {
        expect(err).toBeNull();
        expect(collection.length).toBe(0);
        expect(collection).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users collection', function (done) {
      lofcbg.collection.get(readonlyUserId, { type: lofcbg.types.SERIES }, function (err, collection) {
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
      lofcbg.collection.get(readonlyUserId, { type: lofcbg.types.SERIES, publishers: ['Image Comics'] }, function (err, collection) {
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

  describe('add series to list', function () {
    it('should return error when adding to collection without permission', function (done) {
      lofcbg.collection.add(testComicId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove series from list', function () {
    it('should return error when removing to collection without permission', function (done) {
      lofcbg.collection.remove(testComicId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
