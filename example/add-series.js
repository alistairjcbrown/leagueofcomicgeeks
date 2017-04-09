var lofcbg = require('../');

var username = '<username>';
var password = '<password>';
var seriesId = 131521; // Henry Roscoe: Detective, Sort of
var pullDate = '2017-10-04';

// Log in
lofcbg.session.create(username, password, function (err, userId) {
  if (err) {
    console.log("An error has occurred logging in:", err);
    return;
  }

  // Add series to pull list
  lofcbg.pullList.add(seriesId, { type: lofcbg.types.SERIES }, function (err) {
    if (err) {
      console.log("An error has occurred adding series:", err);
      return;
    }

    // Get pull list
    lofcbg.pullList.get(userId, pullDate, function (err, pullList) {
      if (err) {
        console.log("An error has occurred getting series:", err);
        return;
      }

      console.log("Pull List:", pullList);

      // Log out
      lofcbg.session.destroy(function (err) {
        if (err) {
          console.log("An error has occurred logging out:", err);
          return;
        }

        console.log('Finished');
      });
    });
  });
});
