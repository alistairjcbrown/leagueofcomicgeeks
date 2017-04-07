module.exports = function () {
  describe('Collection', function () {
    require('./issues-list.spec')();
    require('./series-list.spec')();
  });
};
