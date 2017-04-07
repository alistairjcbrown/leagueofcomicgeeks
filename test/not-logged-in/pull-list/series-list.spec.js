var _ = require('lodash');
var lofcbg = require('../../../');

module.exports = function () {
  describe('get series list', function () {
    it('should provide no comics in pull list with an invalid user id', function (done) {
      lofcbg.pullList.get('foo', '2017-01-18', { type: lofcbg.types.SERIES }, function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBe(0);
        expect(pullList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users pull list', function (done) {
      lofcbg.pullList.get(testUserId, '2017-01-18', { type: lofcbg.types.SERIES }, function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBeGreaterThan(0);
        _.each(pullList, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users pull list', function (done) {
      lofcbg.pullList.get(testUserId, '2017-01-18', { type: lofcbg.types.SERIES, publishers: ['Dynamite'] }, function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBeGreaterThan(0);
        _.each(pullList, function (comic) {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should return an error when provided with an invalid date', function (done) {
      lofcbg.pullList.get(testUserId, 'foo', { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Invalid date value provided');
        done();
      });
    });
  });

  describe('add series to list', function () {
    it('should return error when adding to pull list without permission', function (done) {
      lofcbg.pullList.add(testComicId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove series from list', function () {
    it('should return error when removing to pull list without permission', function (done) {
      lofcbg.pullList.remove(testComicId, { type: lofcbg.types.SERIES }, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
