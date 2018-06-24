/* eslint-disable no-console */
const lofcg = require("../");

const username = "<username>";
const password = "<password>";

// Check no valid session
lofcg.session.validate((errValidate, isValidInitially) => {
  if (errValidate) {
    console.log("An error has occurred validating session:", errValidate);
    return;
  }

  console.log("Is session valid?", isValidInitially);

  // Log in
  lofcg.session.create(username, password, (errCreate, userId) => {
    if (errCreate) {
      console.log("An error has occurred logging in:", errCreate);
      return;
    }

    console.log("Logged in as:", userId);

    // Check session is now valid
    lofcg.session.validate((errValidate2, isValidAfterLogin) => {
      if (errValidate2) {
        console.log("An error has occurred validating session:", errValidate2);
        return;
      }

      console.log("Is session valid?", isValidAfterLogin);

      // Get session value
      lofcg.session.get((errGet, session) => {
        if (errGet) {
          console.log("An error has occurred getting session:", errGet);
          return;
        }

        console.log("Got session for:", session.username);

        // Log out
        lofcg.session.destroy(errDestroy => {
          if (errDestroy) {
            console.log("An error has occurred logging out:", errDestroy);
            return;
          }

          console.log("Logged out");

          // Check session has invalidated
          lofcg.session.validate((errValidate3, isValidAfterLogout) => {
            if (errValidate3) {
              console.log(
                "An error has occurred validating session:",
                errValidate3
              );
              return;
            }

            console.log("Is session valid?", isValidAfterLogout);

            // Get session value
            lofcg.session.set(session, (errSet, success) => {
              if (errSet) {
                console.log("An error has occurred setting session:", errSet);
                return;
              }

              console.log("Set session", success);

              // Check session has loaded
              lofcg.session.validate((errValidate4, isValidAfterLoading) => {
                if (errValidate4) {
                  console.log(
                    "An error has occurred validating session:",
                    errValidate4
                  );
                  return;
                }

                console.log("Is session valid?", isValidAfterLoading);
              });
            });
          });
        });
      });
    });
  });
});
