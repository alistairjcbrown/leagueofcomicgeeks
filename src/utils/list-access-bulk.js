const _ = require("lodash");
const request = require("./request");
const authentication = require("./authentication");

const myListUrl = "/comic/my_list_bulk";
const defaultIsSuccessful = function(body) {
  return !_.isNaN(parseInt(body, 10));
};

const modifyList = function(
  seriesId,
  listId,
  actionId,
  isSuccessful,
  failureMessage,
  callback
) {
  if (!authentication.isAuthenticated()) {
    callback(new Error("Not authenticated"));
    return;
  }

  const data = {
    series_id: seriesId,
    list_id: listId,
    action: actionId
  };

  request.post({ uri: myListUrl, form: data }, (error, response, body) => {
    if (error) {
      return callback(error);
    }

    if (!isSuccessful(body)) {
      return callback(new Error(failureMessage));
    }

    if (response && response.statusCode !== 200) {
      return callback(
        new Error(`Unexpected status code ${response.statusCode}`)
      );
    }

    return callback(null);
  });
};

const addToList = function(seriesId, listId, callback) {
  const actionId = "add";
  const failureMessage = "Unable to add series to list";
  return modifyList(
    seriesId,
    listId,
    actionId,
    defaultIsSuccessful,
    failureMessage,
    callback
  );
};

const removeFromList = function(seriesId, listId, callback) {
  const actionId = "remove";
  const failureMessage = "Unable to remove series from list";
  return modifyList(
    seriesId,
    listId,
    actionId,
    defaultIsSuccessful,
    failureMessage,
    callback
  );
};

module.exports = {
  add: addToList,
  remove: removeFromList,
  modify: modifyList
};
