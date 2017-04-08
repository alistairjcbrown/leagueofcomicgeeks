module.exports = function (lofcbg) {
  describe('Search Results', function () {
    var searchTerm = 'Black Magic';
    require('../../shared/search-results/issues-list.spec')(lofcbg, searchTerm);
    require('../../shared/search-results/series-list.spec')(lofcbg, searchTerm);
  });
};
