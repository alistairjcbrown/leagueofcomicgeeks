/* eslint-disable no-console */
const lofcg = require("../");

// Find detctive series
lofcg.searchResults.get(
  "detective",
  { type: lofcg.types.SERIES },
  (err, detectiveSeries) => {
    if (err) {
      console.log("An error has occurred searching for detective series:", err);
      return;
    }

    console.log(detectiveSeries);
  }
);
