var _ = require('lodash');
var allIssues20170104 = require('./test-data/all-issues-2017-01-04');
var filteredIssues20170104 = require('./test-data/filtered-issues-2017-01-04');

module.exports = function (lofcbg) {
  describe('get issues list', function () {
    it('should provide no new comic', function (done) {
      lofcbg.newComics.get(undefined, '2017-01-01', function (err, newComics) {
        expect(err).toBeNull();
        expect(newComics.length).toBe(0);
        expect(newComics).toEqual([]);
        done();
      });
    });

    it('should provide a list of new comics', function (done) {
      lofcbg.newComics.get(undefined, '2017-01-04', function (err, newComics) {
        expect(err).toBeNull();
        expect(newComics.length).toBe(289);
        expect(newComics).toEqual(allIssues20170104);
        _.each(newComics, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of new comics', function (done) {
      lofcbg.newComics.get(undefined, '2017-01-04', { publishers: ['Image Comics'] }, function (err, newComics) {
        expect(err).toBeNull();
        expect(newComics.length).toBe(10);
        expect(newComics).toEqual(filteredIssues20170104);
        _.each(newComics, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should return an error when provided with an invalid date', function (done) {
      lofcbg.newComics.get(undefined, 'foo', function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Invalid date value provided');
        done();
      });
    });
  });
};
