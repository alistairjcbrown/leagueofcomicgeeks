module.exports = function () {
  describe('Read List', function () {
    require('./issues-list.spec')();
    require('./series-list.spec')();
  });
};
