module.exports = function () {
  describe('Not Logged In', function () {
    require('./new-comics')();
    require('./search-results')();
    require('./collection')();
    require('./pull-list')();
    require('./wish-list')();
    require('./read-list')();
  });
};
