var lofcg = require('../../');
var user = require('../utils/test-credentials');

module.exports = function () {
  describe('Authentication', function () {
    afterAll(function (done) {
      lofcg.session.destroy(function () {
        done();
      });
    });

    describe('get session without creating session', function () {
      var getErr, getAuthentication;

      beforeAll(function (done) {
        lofcg.session.get(function (err, authentication) {
          getErr = err;
          getAuthentication = authentication;
          done();
        }.bind(this));
      });

      it('provides null authentication object', function () {
        expect(getErr).toBeNull();
        expect(getAuthentication).toBeNull();
      });
    });

    describe('create session', function () {
      var createErr, createUserId, validateErr, validateIsValid;

      beforeAll(function (done) {
        lofcg.session.create(user.username, user.password, function (err, userId) {
          createErr = err;
          createUserId = userId;

          lofcg.session.validate(function (err, isValid) {
            validateErr = err;
            validateIsValid = isValid;
            done();
          });
        }.bind(this));
      });

      it('authenticates for the user', function () {
        expect(createErr).toBeNull();
        expect(createUserId).toBe(editableUserId);
      });

      it('validates as a session', function () {
        expect(validateErr).toBeNull();
        expect(validateIsValid).toBe(true);
      });

      describe('get session', function () {
        var getErr, getAuthentication;

        beforeAll(function (done) {
          lofcg.session.get(function (err, authentication) {
            getErr = err;
            getAuthentication = authentication;
            done();
          }.bind(this));
        });

        it('provides authentication object', function () {
          expect(getErr).toBeNull();
          expect(getAuthentication).toBeASessionObject({ id: editableUserId, username: user.username });
        });

        describe('destroy session', function () {
          var destroyErr, validateErr2, validateIsValid2;

          beforeAll(function (done) {
            lofcg.session.destroy(function (err) {
              destroyErr = err;

              lofcg.session.validate(function (err, isValid) {
                validateErr2 = err;
                validateIsValid2 = isValid;
                done();
              });
            }.bind(this));
          });

          it('provides authentication object', function () {
            expect(getErr).toBeNull();
          });

          it('no longer validates as a session', function () {
            expect(validateErr2).toBeNull();
            expect(validateIsValid2).toBe(false);
          });

          describe('set existing session', function () {
            var setErr, setIsSet, validateErr3, validateIsValid3;

            beforeAll(function (done) {
              lofcg.session.set(getAuthentication, function (err, isSet) {
                setErr = err;
                setIsSet = isSet;

                lofcg.session.validate(function (err, isValid) {
                  validateErr3 = err;
                  validateIsValid3 = isValid;
                  done();
                });
              }.bind(this));
            });

            it('sets the session', function () {
              expect(setErr).toBeNull();
              expect(setIsSet).toBe(true);
            });

            it('validates as a session', function () {
              expect(validateErr).toBeNull();
              expect(validateIsValid).toBe(true);
            });
          });
        });
      });
    });
  });
};
