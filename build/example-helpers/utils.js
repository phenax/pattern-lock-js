"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = exports.prettyPrint = void 0;

var prettyPrint = function prettyPrint(config) {
  var tabSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var tab = Array(tabSize).fill(' ').join('');

  var predicate = function predicate(value) {
    return value.expresssion ? value.expresssion : JSON.stringify(value);
  };

  var code = Object.keys(config).map(function (key) {
    return "".concat(key, ": ").concat(predicate(config[key]), ",");
  }).map(function (code) {
    return "".concat(tab).concat(code);
  }).join('\n');
  return "{\n".concat(code, "\n}");
};

exports.prettyPrint = prettyPrint;

prettyPrint.expresssion = function (expresssion) {
  return {
    expresssion: expresssion
  };
};

var isEqual = function isEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (var key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
};

exports.isEqual = isEqual;