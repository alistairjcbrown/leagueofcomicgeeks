const _ = require('lodash');

const confirmEmptyFirst = function (resource, additionalArgs, tests) {
  return function () {
    describe('list is empty', () => {
      let getErr;
      let getValue;

      beforeAll((done) => {
        const callback = function (err, value) {
          getErr = err;
          getValue = value;
          done();
        };
        const getArgs = [editableUserId].concat((additionalArgs || []), callback);
        resource.get(...getArgs);
      });

      it('should not return an error', () => {
        expect(getErr).toBeNull();
      });

      it('should be empty list', () => {
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
  beforeAll((done) => {
    const callback = function (err) {
      removeErr = err;
      done();
    };
    const removeArgs = [resourceId].concat((removeAdditionalArgs || []), callback);
    resource.remove(...removeArgs);
  });

  it('should not return an error', () => {
    expect(removeErr).toBeNull();
  });

  describe('getting list', () => {
    it('should be empty', (done) => {
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
