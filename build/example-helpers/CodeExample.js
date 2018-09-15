"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CodeExample = function CodeExample(_ref) {
  var _ref$tabSize = _ref.tabSize,
      tabSize = _ref$tabSize === void 0 ? 4 : _ref$tabSize,
      props = _objectWithoutProperties(_ref, ["tabSize"]);

  return (0, _hyperapp.h)('div', {
    style: 'text-align: left; padding: .7em 1em; background-color: #eee;'
  }, (0, _hyperapp.h)('pre', {}, JSON.stringify(props, 0, tabSize)));
};

var _default = CodeExample;
exports.default = _default;