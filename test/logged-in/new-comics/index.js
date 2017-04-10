module.exports = function (lofcg) {
  describe('New Comics', () => {
    const newComicsDate = '2017-01-04';
    require('../../shared/new-comics/issues-list.spec')(lofcg, newComicsDate);
    require('../../shared/new-comics/series-list.spec')(lofcg, newComicsDate);
  });
};
