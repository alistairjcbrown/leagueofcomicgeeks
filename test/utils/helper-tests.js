var _ = require('lodash');

var confirmEmptyFirst = function (resource, additionalArgs, tests) {
  return function () {
    describe('list is empty', function () {
      var getErr, getValue;

      beforeAll(function (done) {
        var callback = function (err, value) {
          getErr = err;
          getValue = value;
          done();
        }
        var getArgs = [editableUserId].concat((additionalArgs || []), callback);
        resource.get.apply(resource, getArgs);
      });

      it('should not return an error', function () {
        expect(getErr).toBeNull();
      });

      it('should be empty list', function () {
        expect(getValue.length).toBe(0);
        expect(getValue).toEqual([]);
      });

      tests();
    });
  };
};

var testRemovingFromList = function (resource, resourceId, additionalArgs) {
  var removeAdditionalArgs = additionalArgs;
  var getAdditionalArgs = additionalArgs;

  if (_.isObject(additionalArgs) && !_.isArray(additionalArgs)) {
    removeAdditionalArgs = additionalArgs.remove;
    getAdditionalArgs = additionalArgs.get;
  }

  var removeErr;
  beforeAll(function (done) {
    var callback = function (err) {
      removeErr = err;
      done();
    };
    var removeArgs = [resourceId].concat((removeAdditionalArgs || []), callback);
    resource.remove.apply(resource, removeArgs);
  });

  it('should not return an error', function () {
    expect(removeErr).toBeNull();
  });

  describe('getting list', function () {
    it('should be empty', function (done) {
      var callback = function (err, value) {
        expect(err).toBeNull();
        expect(value.length).toBe(0);
        expect(value).toEqual([]);
        done();
      };
      var getArgs = [editableUserId].concat((getAdditionalArgs || []), callback);
      resource.get.apply(resource, getArgs);
    });
  });
};

module.exports = {
  confirmEmptyFirst: confirmEmptyFirst,
  testRemovingFromList: testRemovingFromList
};
