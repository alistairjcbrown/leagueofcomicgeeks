module.exports = function (lofcbg) {
  describe('Collection', function () {
    require('./issues-list.spec')(lofcbg);
    require('./series-list.spec')(lofcbg);
  });
};
