const _ = require('lodash');
const allSeriesPullList = require('./test-data/all-series-pull-list');
const filteredSeriesPullList = require('./test-data/filtered-series-pull-list');

module.exports = function (lofcg, pullListDate) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = _.extend({ publishers: ['Image Comics'] }, options);

  describe('get series list', () => {
    it('should provide no comics in pull list with an invalid user id', (done) => {
      lofcg.pullList.get('foo', pullListDate, options, (err, pullList) => {
        expect(err).toBeNull();
        expect(pullList.length).toBe(0);
        expect(pullList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users pull list', (done) => {
      lofcg.pullList.get(readonlyUserId, pullListDate, options, (err, pullList) => {
        expect(err).toBeNull();
        expect(pullList.length).toBe(2);
        expect(pullList).toEqual(allSeriesPullList);
        _.each(pullList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users pull list', (done) => {
      lofcg.pullList.get(readonlyUserId, pullListDate, filteredOptions, (err, pullList) => {
        expect(err).toBeNull();
        expect(pullList.length).toBe(1);
        expect(pullList).toEqual(filteredSeriesPullList);
        _.each(pullList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should return an error when provided with an invalid date', (done) => {
      lofcg.pullList.get(readonlyUserId, 'foo', options, (err) => {
        expect(err).toEqual(jasmine.any(Error));
        expect(err.message).toEqual('Invalid date value provided');
        done();
      });
    });
  });
};
