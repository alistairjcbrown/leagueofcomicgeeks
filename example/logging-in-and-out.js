/* eslint-disable no-console */
const lofcg = require('../');

const username = '<username>';
const password = '<password>';

// Check no valid session
lofcg.session.validate((errValidate, isValidInitially) => {
  if (errValidate) {
    console.log('An error has occurred validating session:', errValidate);
    return;
  }

  console.log('Is session valid?', isValidInitially);

  // Log in
  lofcg.session.create(username, password, (errCreate, userId) => {
    if (errCreate) {
      console.log('An error has occurred logging in:', errCreate);
      return;
    }

    console.log('Logged in as:', userId);

    // Check session is now valid
    lofcg.session.validate((errValidate2, isValidAfterLogin) => {
      if (errValidate2) {
        console.log('An error has occurred validating session:', errValidate2);
        return;
      }

      console.log('Is session valid?', isValidAfterLogin);

      // Log out
      lofcg.session.destroy((errDestroy) => {
        if (errDestroy) {
          console.log('An error has occurred logging out:', errDestroy);
          return;
        }

        console.log('Logged out');

        // Check session has invalidated
        lofcg.session.validate((errValidate3, isValidAfterLogout) => {
          if (errValidate3) {
            console.log('An error has occurred validating session:', errValidate3);
            return;
          }

          console.log('Is session valid?', isValidAfterLogout);
        });
      });
    });
  });
});
