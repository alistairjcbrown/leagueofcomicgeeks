/* eslint-disable no-console */
const _ = require("lodash");
const moment = require("moment");
const lofcg = require("../");

const weeks = 10;
const wednesday = moment().day(3);
const filter = "star wars";
const range = _.range(weeks);
const data = [];

const filterUnwanted = function(list) {
  const tradePaperback = " tp";
  const hardCover = " hc";
  const graphicNovel = " gn";
  const boxSet = " box set";
  const variant = " variant";
  return _.filter(list, function({ name = "", variantId }) {
    const matches = name.match(/#\d+\w?(.*)?/i);
    return (
      !name.toLowerCase().endsWith(tradePaperback) &&
      !name.toLowerCase().endsWith(hardCover) &&
      !name.toLowerCase().endsWith(graphicNovel) &&
      !name.toLowerCase().endsWith(boxSet) &&
      !name.toLowerCase().endsWith(variant) &&
      (_.isNull(matches) || _.isUndefined(matches[1])) &&
      _.isNull(variantId)
    );
  });
};

const outputresults = function(list) {
  if (list.length < range.length) return;

  const starWarsComics = _.filter(
    _.flattenDeep(list),
    ({ name = "" }) => name.toLowerCase().indexOf(filter) > -1
  );
  const mainIssues = _.orderBy(
    filterUnwanted(starWarsComics),
    ["name", "releaseDate"],
    ["asc", "asc"]
  );

  // console.log(JSON.stringify(mainIssues, null, 4));
  _.each(mainIssues, function({ releaseDate, name, url }) {
    console.log(`[${releaseDate}] ${_.padEnd(name, 50)} --   ${url}`);
  });
};

range.forEach(function(count) {
  const date = wednesday
    .clone()
    .add(count, "weeks")
    .format("YYYY-MM-DD");

  // Get new comics
  lofcg.newComics.get(date, (err, newComics) => {
    if (err) {
      data.push(err);
      console.log("An error has occurred getting new comics:", err);
      return;
    }

    data.push(newComics);
    outputresults(data);
  });
});
