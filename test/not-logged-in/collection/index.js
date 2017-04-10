module.exports = function (lofcg) {
  describe('Collection', () => {
    require('./issues-list.spec')(lofcg);
    require('./series-list.spec')(lofcg);
  });
};
