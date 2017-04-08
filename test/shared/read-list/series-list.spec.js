var _ = require('lodash');
var allSeriesReadList = require('./test-data/all-series-read-list');
var filteredSeriesReadList = require('./test-data/filtered-series-read-list');

module.exports = function (lofcbg) {
  describe('get series list', function () {
    it('should provide no comics in read list with an invalid user id', function (done) {
      lofcbg.readList.get('foo', { type: lofcbg.types.SERIES }, function (err, readList) {
        expect(err).toBeNull();
        expect(readList.length).toBe(0);
        expect(readList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users read list', function (done) {
      lofcbg.readList.get(readonlyUserId, { type: lofcbg.types.SERIES }, function (err, readList) {
        expect(err).toBeNull();
        expect(readList.length).toBe(4);
        expect(readList).toEqual(allSeriesReadList);
        _.each(readList, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users read list', function (done) {
      lofcbg.readList.get(readonlyUserId, { type: lofcbg.types.SERIES, publishers: ['Image Comics'] }, function (err, readList) {
        expect(err).toBeNull();
        expect(readList.length).toBe(1);
        expect(readList).toEqual(filteredSeriesReadList);
        _.each(readList, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
