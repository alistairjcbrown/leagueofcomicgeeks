const _ = require('lodash');

const confirmEmptyFirst = function (resource, additionalArgs, tests) {
  return function () {
    describe('list is empty', function () {
      let getErr;
      let getValue;

      beforeAll(function (done) {
        const callback = function (err, value) {
          getErr = err;
          getValue = value;
          done();
        };
        const getArgs = [editableUserId].concat((additionalArgs || []), callback);
        resource.get(...getArgs);
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

const testRemovingFromList = function (resource, resourceId, additionalArgs) {
  let removeAdditionalArgs = additionalArgs;
  let getAdditionalArgs = additionalArgs;

  if (_.isObject(additionalArgs) && !_.isArray(additionalArgs)) {
    removeAdditionalArgs = additionalArgs.remove;
    getAdditionalArgs = additionalArgs.get;
  }

  let removeErr;
  beforeAll(function (done) {
    const callback = function (err) {
      removeErr = err;
      done();
    };
    const removeArgs = [resourceId].concat((removeAdditionalArgs || []), callback);
    resource.remove(...removeArgs);
  });

  it('should not return an error', function () {
    expect(removeErr).toBeNull();
  });

  describe('getting list', function () {
    it('should be empty', function (done) {
      const callback = function (err, value) {
        expect(err).toBeNull();
        expect(value.length).toBe(0);
        expect(value).toEqual([]);
        done();
      };
      const getArgs = [editableUserId].concat((getAdditionalArgs || []), callback);
      resource.get(...getArgs);
    });
  });
};

module.exports = {
  confirmEmptyFirst,
  testRemovingFromList
};
