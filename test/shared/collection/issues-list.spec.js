var _ = require('lodash');
var allIssuesCollection = require('./test-data/all-issues-collection');
var filteredIssuesCollection = require('./test-data/filtered-issues-collection');

module.exports = function (lofcg) {
  describe('get issues list', function () {
    it('should provide no comics in collection with an invalid user id', function (done) {
      lofcg.collection.get('foo', function (err, collection) {
        expect(err).toBeNull();
        expect(collection.length).toBe(0);
        expect(collection).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users collection', function (done) {
      lofcg.collection.get(readonlyUserId, function (err, collection) {
        expect(err).toBeNull();
        expect(collection.length).toBe(86);
        expect(collection).toEqual(allIssuesCollection);
        _.each(collection, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users collection', function (done) {
      lofcg.collection.get(readonlyUserId, { publishers: ['Image Comics'] }, function (err, collection) {
        expect(err).toBeNull();
        expect(collection.length).toBe(13);
        expect(collection).toEqual(filteredIssuesCollection);
        _.each(collection, function (comic) {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });
};
