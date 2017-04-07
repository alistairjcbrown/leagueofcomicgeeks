module.exports = function () {
  describe('New Comics', function () {
    require('./issues-list.spec')();
    require('./series-list.spec')();
  });
};
