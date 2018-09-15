"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var CodeKey = function CodeKey(_, children) {
  return (0, _hyperapp.h)('span', {
    style: {
      color: '#DB696F'
    }
  }, children);
};

var CodeValue = function CodeValue(_ref) {
  var value = _ref.value;
  return (0, _hyperapp.h)('span', {
    style: {
      color: '#88CA5F'
    }
  }, JSON.stringify(value));
};

var FunctionCall = function FunctionCall(_, children) {
  return (0, _hyperapp.h)('span', {
    style: {
      color: '#1abcdc',
      fontStyle: 'italic'
    }
  }, children);
};

var IndentedBlock = function IndentedBlock(_ref2, children) {
  var _ref2$level = _ref2.level,
      level = _ref2$level === void 0 ? 4 : _ref2$level;
  return (0, _hyperapp.h)('div', {
    style: {
      paddingLeft: "".concat(level * 5, "px")
    }
  }, children);
};

var CodeExample = function CodeExample(_ref3) {
  var _ref3$tabSize = _ref3.tabSize,
      tabSize = _ref3$tabSize === void 0 ? 4 : _ref3$tabSize,
      config = _ref3.config;
  return (0, _hyperapp.h)('div', {
    style: {
      fontSize: '.9em',
      textAlign: 'left',
      padding: '1.7em',
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
  }), '});'));
};

var _default = CodeExample;
exports.default = _default;