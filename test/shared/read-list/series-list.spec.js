const _ = require('lodash');
const allSeriesReadList = require('./test-data/all-series-read-list');
const filteredSeriesReadList = require('./test-data/filtered-series-read-list');

module.exports = function (lofcg) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = _.extend({ publishers: ['Image Comics'] }, options);

  describe('get series list', () => {
    it('should provide no comics in read list with an invalid user id', (done) => {
      lofcg.readList.get('foo', options, (err, readList) => {
        expect(err).toBeNull();
        expect(readList.length).toBe(0);
        expect(readList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users read list', (done) => {
      lofcg.readList.get(readonlyUserId, options, (err, readList) => {
        expect(err).toBeNull();
        expect(readList.length).toBe(4);
        expect(readList).toEqual(allSeriesReadList);
        _.each(readList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users read list', (done) => {
      lofcg.readList.get(readonlyUserId, filteredOptions, (err, readList) => {
        expect(err).toBeNull();
        expect(readList.length).toBe(1);
        expect(readList).toEqual(filteredSeriesReadList);
        _.each(readList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
