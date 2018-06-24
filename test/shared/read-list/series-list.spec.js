const _ = require('lodash');

module.exports = function (lofcg) {
  const options = { type: lofcg.types.SERIES };
  const filteredOptions = _.extend({ publishers: ['Image Comics'] }, options);
  const sortedOptions = _.extend({ sort: 'desc' }, options);

  describe('get series list', function () {
    it('should provide no comics in read list with an invalid user id', function (done) {
      lofcg.readList.get('foo', options, (err, readList) => {
        expect(err).toBeNull();
        expect(readList).toEqual([]);
        done();
      });
    });

    it('should provide a list of comics from a users read list', function (done) {
      lofcg.readList.get(readonlyUserId, options, (err, readList) => {
        expect(err).toBeNull();
        expect(readList).toMatchJsonSnapshot('all-series-read-list');
        _.each(readList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a filtered list of comics from a users read list', function (done) {
      lofcg.readList.get(readonlyUserId, filteredOptions, (err, readList) => {
        expect(err).toBeNull();
        expect(readList).toMatchJsonSnapshot('filtered-series-read-list');
        _.each(readList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });

    it('should provide a sorted list of comics from a users read list', function (done) {
      lofcg.readList.get(readonlyUserId, sortedOptions, (err, readList) => {
        expect(err).toBeNull();
        expect(readList).toMatchJsonSnapshot('sorted-series-read-list');
        _.each(readList, (comic) => {
          expect(comic).toBeAComicSeries();
        });
        done();
      });
    });
  });
};
