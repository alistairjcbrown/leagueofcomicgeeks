var _ = require('lodash');
var allSeriesPullList = require('./test-data/all-series-pull-list');
var filteredSeriesPullList = require('./test-data/filtered-series-pull-list');

module.exports = function (lofcg, pullListDate) {
  describe('get series list', function () {
    it('should provide no comics in pull list with an invalid user id', function (done) {
      lofcg.pullList.get('foo', pullListDate, { type: lofcg.types.SERIES }, function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBe(0);
        expect(pullList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users pull list', function (done) {
      lofcg.pullList.get(readonlyUserId, pullListDate, { type: lofcg.types.SERIES }, function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBe(2);
        expect(pullList).toEqual(allSeriesPullList);
        _.each(pullList, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users pull list', function (done) {
      lofcg.pullList.get(readonlyUserId, pullListDate, { type: lofcg.types.SERIES, publishers: ['Image Comics'] }, function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBe(1);
        expect(pullList).toEqual(filteredSeriesPullList);
        _.each(pullList, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should return an error when provided with an invalid date', function (done) {
      lofcg.pullList.get(readonlyUserId, 'foo', { type: lofcg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Invalid date value provided');
        done();
      });
    });
  });
};
