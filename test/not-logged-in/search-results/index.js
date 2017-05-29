module.exports = function (lofcg) {
  describe('Search Results', function () {
    const searchTerm = 'Seduction of the Innocent';
    require('../../shared/search-results/issues-list.spec')(lofcg, searchTerm);
    require('../../shared/search-results/series-list.spec')(lofcg, searchTerm);
  });
};
