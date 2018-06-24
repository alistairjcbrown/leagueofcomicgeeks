const _ = require("lodash");
const cheerio = require("cheerio");
const moment = require("moment");
const config = require("../../config");

const convertToISO8601Date = function(dateString) {
  if (_.isEmpty(dateString)) return "";
  const date = moment(dateString, "MMM Do, YYYY");
  if (!date.isValid()) return "";
  return date.format("YYYY-MM-DD");
};

const sortList = function(list, sortBy = "asc") {
  if (sortBy === "asc" || sortBy === "desc") {
    return _.orderBy(list, "name", sortBy);
  }
  return list;
};

const buildSeriesUrl = function(id, coverUrl) {
  const slug = coverUrl.match(/\/\d+-(.+)\./)[1];
  return `/comics/series/${id}/${slug}`;
};

const seriesExtractor = function(response, options) {
  const $ = cheerio.load(response.list);

  const extractSeriesData = function() {
    const $el = $(this);
    const id = $el.find(".name a").attr("data-id");
    const name = $el
      .find(".name a")
      .text()
      .trim();
    const cover = $el
      .find(".cover img")
      .attr("data-original")
      .split("?")[0];
    const publisher = $el
      .find(".publisher")
      .text()
      .trim();
    const count = parseInt(
      $el
        .find(".details")
        .text()
        .trim(),
      10
    );
    const series = $el
      .find(".series")
      .text()
      .trim();

    return {
      id,
      name,
      url: config.rootUrl + buildSeriesUrl(id, cover),
      cover: config.rootUrl + cover,
      publisher,
      count,
      series
    };
  };

  return sortList(
    $("li")
      .map(extractSeriesData)
      .get(),
    options.sort
  );
};

const getVote = (piece, boundary) =>
  parseFloat(piece.match(new RegExp(`${boundary}([^%]+)%`))[1].trim());
const getVotes = function($el) {
  const consensus = "consensus:";
  const potw = "potw:";

  const toolbarPieces = $el
    .find(".comic-list-toolbar-text")
    .text()
    .trim()
    .replace(/·/g, "")
    .split("    ")
    .map(value => value.trim().toLowerCase())
    .filter(value => value !== "");

  return toolbarPieces.reduce(
    function(votes, piece) {
      if (piece.includes(consensus))
        return _.extend({}, votes, {
          consensusVote: getVote(piece, consensus)
        });
      if (piece.includes(potw))
        return _.extend({}, votes, { pickOfTheWeekVote: getVote(piece, potw) });
      return votes;
    },
    { consensusVote: null, pickOfTheWeekVote: null }
  );
};

const getCollectionStats = function($, $el) {
  const collectionStats = $el
    .find(".comic-list-stats a")
    .map(function() {
      const $statButton = $(this);
      const actionText = $statButton
        .find(".text")
        .text()
        .toLowerCase();
      const counterValue = parseInt($statButton.find(".counter").text(), 10);

      if (actionText.startsWith("add")) return { added: counterValue };
      if (actionText.startsWith("pull")) return { pulled: counterValue };
      return {};
    })
    .get();

  return _.extend(
    {
      pulled: null,
      added: null
    },
    ...collectionStats
  );
};

const issueExtractor = function(response, options) {
  const $ = cheerio.load(response.list);

  const extractIssueData = function() {
    const $el = $(this);
    const url = $el
      .find(".comic-title a")
      .attr("href")
      .trim();
    const [, id, variantId = null] = url.match(
      /comic\/(\d+)\/.+?(?:\?variant=(\d+))?$/
    );
    const name = $el
      .find(".comic-title a")
      .text()
      .trim();
    const cover = $el
      .find(".comic-cover-art img")
      .attr("data-original")
      .split("?")[0];
    const diamondSku =
      $el
        .find(".comic-diamond-sku")
        .text()
        .trim() || null;
    const { consensusVote, pickOfTheWeekVote } = getVotes($el);
    const { pulled, added } = getCollectionStats($, $el);

    const comicDetails = $el
      .find(".comic-details")
      .text()
      .split("·");
    const publisher = (comicDetails[0] || "").trim();
    const releaseDate = convertToISO8601Date((comicDetails[1] || "").trim());
    const price = (comicDetails[2] || "").trim();

    const $description = $el.find(".comic-description p");
    $description.find("a").remove();
    const description = $description.text().trim();

    return {
      id,
      variantId,
      url: config.rootUrl + url,
      name,
      cover: cover.includes("no-cover") ? null : config.rootUrl + cover,
      publisher,
      description,
      releaseDate,
      price,
      diamondSku,
      userMetrics: {
        pulled,
        added,
        consensusVote,
        pickOfTheWeekVote
      }
    };
  };

  return sortList(
    $("li")
      .map(extractIssueData)
      .get(),
    options.sort
  );
};

const extractionHandler = {
  series: seriesExtractor,
  issue: issueExtractor
};

module.exports = function(response, options) {
  const handler =
    extractionHandler[options.type] || extractionHandler[config.defaultType];
  return handler(response, options);
};
