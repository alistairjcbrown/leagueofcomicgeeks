module.exports = function () {
  describe('Pull List', function () {
    require('./issues-list.spec')();
    require('./series-list.spec')();
  });
};
