var _ = require('lodash');
var lofcbg = require('../../../');
var allIssuesCollection = require('./test-data/all-issues-collection');
var filteredIssuesCollection = require('./test-data/filtered-issues-collection');

module.exports = function () {
  describe('get issues list', function () {
    it('should provide no comics in collection with an invalid user id', function (done) {
      lofcbg.collection.get('foo', function (err, collection) {
        expect(err).toBeNull();
        expect(collection.length).toBe(0);
        expect(collection).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users collection', function (done) {
      lofcbg.collection.get(readonlyUserId, function (err, collection) {
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
      lofcbg.collection.get(readonlyUserId, { publishers: ['Image Comics'] }, function (err, collection) {
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

  describe('add issue to list', function () {
    it('should return error when adding to collection without permission', function (done) {
      lofcbg.collection.add(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });

  describe('remove issue from list', function () {
    it('should return error when removing to collection without permission', function (done) {
      lofcbg.collection.remove(testComicId, function (err) {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Not authenticated');
        done();
      });
    });
  });
};
