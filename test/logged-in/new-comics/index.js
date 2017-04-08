module.exports = function (lofcbg) {
  describe('New Comics', function () {
    var newComicsDate = '2017-01-04';
    require('../../shared/new-comics/issues-list.spec')(lofcbg, newComicsDate);
    require('../../shared/new-comics/series-list.spec')(lofcbg, newComicsDate);
  });
};
