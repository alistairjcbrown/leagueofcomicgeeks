module.exports = function (lofcbg) {
  describe('Wish List', function () {
    require('./issues-list.spec')(lofcbg);
    require('./series-list.spec')(lofcbg);
  });
};
