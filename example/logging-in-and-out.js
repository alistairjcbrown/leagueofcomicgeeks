var lofcg = require('../');

var username = '<username>';
var password = '<password>';

// Check no valid session
lofcg.session.validate(function (err, isValid) {
  if (err) {
    console.log("An error has occurred validating session:", err);
    return;
  }

  console.log('Is session valid?', isValid);

  // Log in
  lofcg.session.create(username, password, function (err, userId) {
    if (err) {
      console.log("An error has occurred logging in:", err);
      return;
    }

    console.log('Logged in as:', userId);

    // Check session is now valid
    lofcg.session.validate(function (err, isValid) {
      if (err) {
        console.log("An error has occurred validating session:", err);
        return;
      }

      console.log('Is session valid?', isValid);

      // Log out
      lofcg.session.destroy(function (err) {
        if (err) {
          console.log("An error has occurred logging out:", err);
          return;
        }

        console.log('Logged out');

        // Check session has invalidated
        lofcg.session.validate(function (err, isValid) {
          if (err) {
            console.log("An error has occurred validating session:", err);
            return;
          }

          console.log('Is session valid?', isValid);
        });
      });
    });
  });
});
