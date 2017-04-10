module.exports = function (lofcg) {
  describe('Search Results', function () {
    var searchTerm = 'Black Magic';
    require('../../shared/search-results/issues-list.spec')(lofcg, searchTerm);
    require('../../shared/search-results/series-list.spec')(lofcg, searchTerm);
  });
};
