module.exports = function (lofcg) {
  describe('Read List', () => {
    require('./issues-list.spec')(lofcg);
    require('./series-list.spec')(lofcg);
  });
};
