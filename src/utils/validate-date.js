const moment = require("moment");

module.exports = function(dateString) {
  return moment(dateString, "YYYY-MM-DD").isValid();
};
