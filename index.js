const types = require("./src/utils/types");
const sort = require("./src/utils/sort");
const filters = require("./src/utils/filter");
const session = require("./src/session");
const searchResults = require("./src/search-results");
const newComics = require("./src/new-comics");
const collection = require("./src/collection");
const pullList = require("./src/pull-list");
const wishList = require("./src/wish-list");
const readList = require("./src/read-list");

module.exports = {
  types,
  sort,
  filters,
  session,
  searchResults,
  newComics,
  collection,
  pullList,
  wishList,
  readList
};
