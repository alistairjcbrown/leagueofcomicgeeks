const lofcg = require('../../');
const user = require('../utils/test-credentials');

module.exports = function () {
  describe('Authentication', function () {
    afterAll(function (done) {
      lofcg.session.destroy(() => {
        done();
      });
    });

    describe('get session without creating session', function () {
      let getErr;
      let getAuthentication;

      beforeAll(function (done) {
        lofcg.session.get((err, authentication) => {
          getErr = err;
          getAuthentication = authentication;
          done();
        });
      });

      it('provides null authentication object', function () {
        expect(getErr).toBeNull();
        expect(getAuthentication).toBeNull();
      });
    });

    describe('create session', function () {
      let createErr;
      let createUserId;
      let validateErr;
      let validateIsValid;

      beforeAll(function (done) {
        lofcg.session.create(user.username, user.password, (err, userId) => {
          createErr = err;
          createUserId = userId;

          lofcg.session.validate((err2, isValid) => {
            validateErr = err2;
            validateIsValid = isValid;
            done();
          });
        });
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
        let getErr;
        let getAuthentication;

        beforeAll(function (done) {
          lofcg.session.get((err, authentication) => {
            getErr = err;
            getAuthentication = authentication;
            done();
          });
        });

        it('provides authentication object', function () {
          expect(getErr).toBeNull();
          expect(getAuthentication).toBeASessionObject({ id: editableUserId, username: user.username });
        });

        describe('destroy session', function () {
          let destroyErr;
          let validateErr2;
          let validateIsValid2;

          beforeAll(function (done) {
            lofcg.session.destroy((err) => {
              destroyErr = err;

              lofcg.session.validate((err2, isValid) => {
                validateErr2 = err2;
                validateIsValid2 = isValid;
                done();
              });
            });
          });

          it('should not return an error', function () {
            expect(destroyErr).toBeNull();
          });

          it('no longer validates as a session', function () {
            expect(validateErr2).toBeNull();
            expect(validateIsValid2).toBe(false);
          });

          describe('set existing session', function () {
            let setErr;
            let setIsSet;
            let validateErr3;
            let validateIsValid3;

            beforeAll(function (done) {
              lofcg.session.set(getAuthentication, (err, isSet) => {
                setErr = err;
                setIsSet = isSet;

                lofcg.session.validate((err2, isValid) => {
                  validateErr3 = err2;
                  validateIsValid3 = isValid;
                  done();
                });
              });
            });

            it('sets the session', function () {
              expect(setErr).toBeNull();
              expect(setIsSet).toBe(true);
            });

            it('validates as a session', function () {
              expect(validateErr3).toBeNull();
              expect(validateIsValid3).toBe(true);
            });
          });
        });
      });
    });
  });
};
