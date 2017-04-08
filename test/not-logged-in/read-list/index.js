module.exports = function (lofcbg) {
  describe('Read List', function () {
    require('./issues-list.spec')(lofcbg);
    require('./series-list.spec')(lofcbg);
  });
};
