/* eslint-disable no-console */
const lofcg = require('../');

const username = '<username>';
const password = '<password>';
const seriesId = 131521; // Henry Roscoe: Detective, Sort of
const pullDate = '2017-10-04';

// Log in
lofcg.session.create(username, password, (errCreate, userId) => {
  if (errCreate) {
    console.log('An error has occurred logging in:', errCreate);
    return;
  }

  // Add series to pull list
  lofcg.pullList.add(seriesId, { type: lofcg.types.SERIES }, (errAdd) => {
    if (errAdd) {
      console.log('An error has occurred adding series:', errAdd);
      return;
    }

    // Get pull list
    lofcg.pullList.get(userId, pullDate, (errGet, pullList) => {
      if (errGet) {
        console.log('An error has occurred getting series:', errGet);
        return;
      }

      console.log('Pull List:', pullList);

      // Log out
      lofcg.session.destroy((errDestroy) => {
        if (errDestroy) {
          console.log('An error has occurred logging out:', errDestroy);
          return;
        }

        console.log('Finished');
      });
    });
  });
});
