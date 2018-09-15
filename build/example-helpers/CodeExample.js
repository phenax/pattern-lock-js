"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var _utils = require("./utils");

var _CopyBtn = _interopRequireDefault(require("./CopyBtn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withColoredText = function withColoredText(color) {
  var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (props, children) {
    return children;
  };
  return function (props, children) {
    return (0, _hyperapp.h)('span', {
      style: {
        color: color
      }
    }, predicate(props, children));
  };
};

var CodeKey = withColoredText('#DB696F');
var FunctionCall = withColoredText('#1abcdc');
var CodeValue = withColoredText('#88CA5F', function (_ref) {
  var value = _ref.value;
  return JSON.stringify(value);
});

var IndentedBlock = function IndentedBlock(_ref2, children) {
  var _ref2$level = _ref2.level,
      level = _ref2$level === void 0 ? 4 : _ref2$level;
  return (0, _hyperapp.h)('div', {
    style: {
      paddingLeft: "".concat(level * 7, "px")
    }
  }, children);
};

var CodeExample = function CodeExample(_ref3) {
  var _ref3$tabSize = _ref3.tabSize,
      tabSize = _ref3$tabSize === void 0 ? 4 : _ref3$tabSize,
      config = _ref3.config;
  return (0, _hyperapp.h)('div', {
    style: {
      position: 'relative',
      fontSize: '.9em',
      textAlign: 'left',
      padding: '2em',
      backgroundColor: '#2c3e50',
      color: '#eee',
      fontFamily: '"Courier New", Courier, monospace',
      fontWeight: 'bold'
    }
  }, (0, _hyperapp.h)('div', {}, (0, _hyperapp.h)('span', {
    style: {
      color: '#cb89e6'
    }
  }, 'const'), ' lock = ', (0, _hyperapp.h)(FunctionCall, {}, 'PatternLock'), '({', (0, _hyperapp.h)(IndentedBlock, {}, [(0, _hyperapp.h)(CodeKey, {}, '$canvas'), ': ', (0, _hyperapp.h)('span', {}, ['document.', (0, _hyperapp.h)(FunctionCall, {}, 'getElementById'), '(', (0, _hyperapp.h)(CodeValue, {
    value: 'myCanvas'
  }), ')']), ',']), Object.keys(config).map(function (key) {
    return (0, _hyperapp.h)(IndentedBlock, {}, [(0, _hyperapp.h)(CodeKey, {}, key), ': ', (0, _hyperapp.h)(CodeValue, {
      value: config[key]
    }), ',']);
  }), '});'), (0, _hyperapp.h)(_CopyBtn.default, {
    text: "const lock = PatternLock(".concat((0, _utils.prettyPrint)(_objectSpread({
      $canvas: _utils.prettyPrint.expresssion('document.getElementById("myCanvas")')
    }, config)), ");")
  }));
};

var _default = CodeExample;
exports.default = _default;