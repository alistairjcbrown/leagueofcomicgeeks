module.exports = function (lofcbg) {
  describe('Pull List', function () {
    var pullListDate = '2017-05-03';
    require('./issues-list.spec')(lofcbg, pullListDate);
    require('./series-list.spec')(lofcbg, pullListDate);
  });
};
