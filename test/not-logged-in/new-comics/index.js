module.exports = function (lofcg) {
  describe('New Comics', function () {
    require('./issues-list.spec')(lofcg);
    require('./series-list.spec')(lofcg);
  });
};
