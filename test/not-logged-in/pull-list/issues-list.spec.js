var _ = require('lodash');
var lofcbg = require('../../../');

module.exports = function () {
  describe('get issues list', function () {
    it('should provide no comics in pull list with an invalid user id', function (done) {
      lofcbg.pullList.get('foo', '2017-01-18', function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBe(0);
        expect(pullList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users pull list', function (done) {
      lofcbg.pullList.get(testUserId, '2017-01-18', function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBeGreaterThan(0);
        _.each(pullList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users pull list', function (done) {
      lofcbg.pullList.get(testUserId, '2017-01-18', { publishers: ['Dynamite'] }, function (err, pullList) {
        expect(err).toBeNull();
        expect(pullList.length).toBeGreaterThan(0);
        _.each(pullList, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should return an error when provided with an invalid date', function (done) {
      lofcbg.pullList.get(testUserId, 'foo', function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Invalid date value provided');
        done();
      });
    });
  });

  describe('add issue to list', function () {
    it('should return error when adding to pull list without permission', function (done) {
      lofcbg.pullList.add(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove issue from list', function () {
    it('should return error when removing to pull list without permission', function (done) {
      lofcbg.pullList.remove(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
