/* eslint-disable no-console */
const _ = require('lodash');
const moment = require('moment');
const lofcg = require('../');

const weeks = 10;
const wednesday = moment().day(3);
const filter = 'star wars';
const range = _.range(weeks);
const data = [];

const filterUnwanted = function (list) {
  const tradePaperback = ' tp';
  const hardCover = ' hc';
  const variant = ' variant';
  return _.filter(list, function ({ name = '' }) {
    return !name.toLowerCase().endsWith(tradePaperback) &&
           !name.toLowerCase().endsWith(hardCover) &&
           !name.toLowerCase().endsWith(variant) &&
           _.isUndefined(name.match(/#\d+\w?(.*)?/i)[1]);
  });
};

const outputresults = function (list) {
  if (list.length < range.length) return;

  const starWarsComics = _.filter(_.flattenDeep(list), ({ name = '' }) => name.toLowerCase().indexOf(filter) > -1);
  const mainIssues = _.orderBy(filterUnwanted(starWarsComics), ['name', 'releaseDate'], ['asc', 'asc']);

  console.log(JSON.stringify(mainIssues, null, 4));
};

range.forEach(function (count) {
  const date = wednesday.clone().add(count, 'weeks').format('YYYY-MM-DD');

  // Get new comics
  lofcg.newComics.get(date, (err, newComics) => {
    if (err) {
      data.push(err);
      console.log('An error has occurred getting new comics:', err);
      return;
    }

    data.push(newComics);
    outputresults(data);
  });
});

