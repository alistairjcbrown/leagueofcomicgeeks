module.exports = function (lofcg) {
  describe('Pull List', function () {
    const pullListDate = '2017-05-03';
    require('./issues-list.spec')(lofcg, pullListDate);
    require('./series-list.spec')(lofcg, pullListDate);
  });
};
