const _ = require('lodash');
const allIssues20160104 = require('./test-data/all-issues-2016-01-04');
const filteredIssues20160104 = require('./test-data/filtered-issues-2016-01-04');
const sortedIssues20160104 = require('./test-data/sorted-issues-2016-01-04');

module.exports = function (lofcg, newComicsDate) {
  describe('get issues list', function () {
    it('should provide no new comic', function (done) {
      lofcg.newComics.get('1966-01-01', (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(0);
        expect(newComics).toEqual([]);
        done();
      });
    });

    it('should provide a list of new comics', function (done) {
      lofcg.newComics.get(newComicsDate, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(243);
        expect(newComics).toEqual(allIssues20160104);
        _.each(newComics, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of new comics', function (done) {
      lofcg.newComics.get(newComicsDate, { publishers: ['Image Comics'] }, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(12);
        expect(newComics).toEqual(filteredIssues20160104);
        _.each(newComics, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a sorted list of new comics', function (done) {
      lofcg.newComics.get(newComicsDate, { sort: 'desc' }, (err, newComics) => {
        expect(err).toBeNull();
        expect(newComics.length).toBe(243);
        expect(newComics).toEqual(sortedIssues20160104);
        _.each(newComics, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should return an error when provided with an invalid date', function (done) {
      lofcg.newComics.get('foo', (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Invalid date value provided');
        done();
      });
    });
  });
};
