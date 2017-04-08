module.exports = function () {
  describe('Search Results', function () {
    var searchTerm = 'Black Magic';
    require('./issues-list.spec')(searchTerm);
    require('./series-list.spec')(searchTerm);
  });
};
