module.exports = function () {
  describe('Search Results', function () {
    require('./issues-list.spec')();
    require('./series-list.spec')();
  });
};
