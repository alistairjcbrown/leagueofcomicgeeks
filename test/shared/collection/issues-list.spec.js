const _ = require('lodash');
const allIssuesCollection = require('./test-data/all-issues-collection');
const filteredIssuesCollection = require('./test-data/filtered-issues-collection');

module.exports = function (lofcg) {
  describe('get issues list', () => {
    it('should provide no comics in collection with an invalid user id', (done) => {
      lofcg.collection.get('foo', (err, collection) => {
        expect(err).toBeNull();
        expect(collection.length).toBe(0);
        expect(collection).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users collection', (done) => {
      lofcg.collection.get(readonlyUserId, (err, collection) => {
        expect(err).toBeNull();
        expect(collection.length).toBe(86);
        expect(collection).toEqual(allIssuesCollection);
        _.each(collection, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users collection', (done) => {
      lofcg.collection.get(readonlyUserId, { publishers: ['Image Comics'] }, (err, collection) => {
        expect(err).toBeNull();
        expect(collection.length).toBe(13);
        expect(collection).toEqual(filteredIssuesCollection);
        _.each(collection, (comic) => {
          expect(comic).toBeAComicIssue();
        });
        done();
      });
    });
  });
};
