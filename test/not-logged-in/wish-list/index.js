module.exports = function () {
  describe('Wish List', function () {
    require('./issues-list.spec')();
    require('./series-list.spec')();
  });
};
