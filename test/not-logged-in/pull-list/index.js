module.exports = function () {
  describe('Pull List', function () {
    var pullListDate = '2017-05-03';
    require('./issues-list.spec')(pullListDate);
    require('./series-list.spec')(pullListDate);
  });
};
