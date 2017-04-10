var lofcg = require('../');

var username = '<username>';
var password = '<password>';
var seriesId = 131521; // Henry Roscoe: Detective, Sort of
var pullDate = '2017-10-04';

// Log in
lofcg.session.create(username, password, function (err, userId) {
  if (err) {
    console.log("An error has occurred logging in:", err);
    return;
  }

  // Add series to pull list
  lofcg.pullList.add(seriesId, { type: lofcg.types.SERIES }, function (err) {
    if (err) {
      console.log("An error has occurred adding series:", err);
      return;
    }

    // Get pull list
    lofcg.pullList.get(userId, pullDate, function (err, pullList) {
      if (err) {
        console.log("An error has occurred getting series:", err);
        return;
      }

      console.log("Pull List:", pullList);

      // Log out
      lofcg.session.destroy(function (err) {
        if (err) {
          console.log("An error has occurred logging out:", err);
          return;
        }

        console.log('Finished');
      });
    });
  });
});
