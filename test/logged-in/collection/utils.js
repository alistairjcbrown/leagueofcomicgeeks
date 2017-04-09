var confirmEmptyFirst = function (lofcbg, additionalArgs, tests) {
  return function () {
    describe('list is empty', function () {
      var getErr, getCollection;

      beforeAll(function (done) {
        var callback = function (err, collection) {
          getErr = err;
          getCollection = collection;
          done();
        }
        var getArgs = [editableUserId].concat((additionalArgs || []), callback);
        lofcbg.collection.get.apply(lofcbg.collection, getArgs);
      });

      it('should not return an error', function () {
        expect(getErr).toBeNull();
      });

      it('should be empty list', function () {
        expect(getCollection.length).toBe(0);
        expect(getCollection).toEqual([]);
      });

      tests();
    });
  };
};

var testRemovingFromList = function (lofcbg, resourceId, additionalArgs) {
  var removeErr;

  beforeAll(function (done) {
    var callback = function (err) {
      removeErr = err;
      done();
    };
    var removeArgs = [resourceId].concat((additionalArgs || []), callback);
    lofcbg.collection.remove.apply(lofcbg.collection, removeArgs);
  });

  it('should not return an error', function () {
    expect(removeErr).toBeNull();
  });

  describe('getting list', function () {
    it('should be empty', function (done) {
      var callback = function (err, collection) {
        expect(err).toBeNull();
        expect(collection.length).toBe(0);
        expect(collection).toEqual([]);
        done();
      };
      var getArgs = [editableUserId].concat((additionalArgs || []), callback);
      lofcbg.collection.get.apply(lofcbg.collection, getArgs);
    });
  });
};

module.exports = {
  confirmEmptyFirst: confirmEmptyFirst,
  testRemovingFromList: testRemovingFromList
};
