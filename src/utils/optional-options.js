var _ = require('lodash');
var types = require('./types');

module.exports = function (wrappedFunction) {
  return function () {
    var args = Array.prototype.slice.call(arguments);

    var argsCount = args.length;
    var lastArg = args[argsCount-1];
    var penultimateArg = args[argsCount-2];

    if (!_.isObject(penultimateArg) && _.isFunction(lastArg)) {
      var defaultedOptions = { type: types.ISSUE };
      args.splice(argsCount-1, 0, defaultedOptions);
    }

    return wrappedFunction.apply(null, args);
  };
}
