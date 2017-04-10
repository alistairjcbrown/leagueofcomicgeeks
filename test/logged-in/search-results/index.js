module.exports = function (lofcg) {
  describe('Search Results', () => {
    const searchTerm = 'Black Magic';
    require('../../shared/search-results/issues-list.spec')(lofcg, searchTerm);
    require('../../shared/search-results/series-list.spec')(lofcg, searchTerm);
  });
};
