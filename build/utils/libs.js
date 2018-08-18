"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gcd = exports.bindContext = exports.hashCode = exports.patternToWords = void 0;

// patternToWords :: Array<Node> -> String
var patternToWords = function patternToWords(nodes) {
  return JSON.stringify(nodes);
}; //	nodes.reduce((string = '', node) => wordMap[node.row - 1][node.col - 1] + string);
// hashCode :: String -> String


exports.patternToWords = patternToWords;

var hashCode = function hashCode(str) {
  if (!str.length) return '';
  var hash = str.split('').reduce(function () {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var b = arguments.length > 1 ? arguments[1] : undefined;
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  });
  return btoa(hash + '');
}; // bindContext :: (Object, Array<Function>) -> ()


exports.hashCode = hashCode;

var bindContext = function bindContext(ctx, fns) {
  return fns.forEach(function (fnName) {
    return ctx[fnName] = ctx[fnName] && ctx[fnName].bind(ctx);
  });
}; // gcd :: (Number, Number) -> Number


exports.bindContext = bindContext;

var gcd = function gcd(x, y) {
  while (y !== 0) {
    var tmp = x;
    x = y;
    y = tmp % y;
  }

  return x;
};

exports.gcd = gcd;