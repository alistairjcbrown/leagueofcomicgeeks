const lofcg = require('../../');
const user = require('../utils/test-credentials');

module.exports = function () {
  describe('Authentication', () => {
    afterAll((done) => {
      lofcg.session.destroy(() => {
        done();
      });
    });

    describe('get session without creating session', () => {
      let getErr;
      let getAuthentication;

      beforeAll((done) => {
        lofcg.session.get((err, authentication) => {
          getErr = err;
          getAuthentication = authentication;
          done();
        });
      });

      it('provides null authentication object', () => {
        expect(getErr).toBeNull();
        expect(getAuthentication).toBeNull();
      });
    });

    describe('create session', () => {
      let createErr;
      let createUserId;
      let validateErr;
      let validateIsValid;

      beforeAll((done) => {
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

      it('authenticates for the user', () => {
        expect(createErr).toBeNull();
        expect(createUserId).toBe(editableUserId);
      });

      it('validates as a session', () => {
        expect(validateErr).toBeNull();
        expect(validateIsValid).toBe(true);
      });

      describe('get session', () => {
        let getErr;
        let getAuthentication;

        beforeAll((done) => {
          lofcg.session.get((err, authentication) => {
            getErr = err;
            getAuthentication = authentication;
            done();
          });
        });

        it('provides authentication object', () => {
          expect(getErr).toBeNull();
          expect(getAuthentication).toBeASessionObject({ id: editableUserId, username: user.username });
        });

        describe('destroy session', () => {
          let destroyErr;
          let validateErr2;
          let validateIsValid2;

          beforeAll((done) => {
            lofcg.session.destroy((err) => {
              destroyErr = err;

              lofcg.session.validate((err2, isValid) => {
                validateErr2 = err2;
                validateIsValid2 = isValid;
                done();
              });
            });
          });

          it('should not return an error', () => {
            expect(destroyErr).toBeNull();
          });

          it('no longer validates as a session', () => {
            expect(validateErr2).toBeNull();
            expect(validateIsValid2).toBe(false);
          });

          describe('set existing session', () => {
            let setErr;
            let setIsSet;
            let validateErr3;
            let validateIsValid3;

            beforeAll((done) => {
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

            it('sets the session', () => {
              expect(setErr).toBeNull();
              expect(setIsSet).toBe(true);
            });

            it('validates as a session', () => {
              expect(validateErr3).toBeNull();
              expect(validateIsValid3).toBe(true);
            });
          });
        });
      });
    });
  });
};
