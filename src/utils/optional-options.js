const _ = require("lodash");
const types = require("./types");

module.exports = function(wrappedFunction) {
  return function(...args) {
    const argsCount = args.length;
    const lastArg = args[argsCount - 1];
    const penultimateArg = args[argsCount - 2];

    if (!_.isObject(penultimateArg) && _.isFunction(lastArg)) {
      const defaultedOptions = { type: types.ISSUE };
      args.splice(argsCount - 1, 0, defaultedOptions);
    }

    if (
      _.isObject(penultimateArg) &&
      _.isFunction(lastArg) &&
      _.isUndefined(penultimateArg.type)
    ) {
      penultimateArg.type = types.ISSUE;
    }

    return wrappedFunction(...args);
  };
};
