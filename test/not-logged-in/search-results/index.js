module.exports = function (lofcbg) {
  describe('Search Results', function () {
    var searchTerm = 'Black Magic';
    require('./issues-list.spec')(lofcbg, searchTerm);
    require('./series-list.spec')(lofcbg, searchTerm);
  });
};
