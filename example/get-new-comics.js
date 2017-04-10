/* eslint-disable no-console */
const moment = require('moment');
const lofcg = require('../');

const wednesday = moment().day(3).format('YYYY-MM-DD');

// Get new comics for next week
lofcg.newComics.get(wednesday, (err, newComics) => {
  if (err) {
    console.log('An error has occurred getting new comics:', err);
    return;
  }

  console.log(newComics);
});
