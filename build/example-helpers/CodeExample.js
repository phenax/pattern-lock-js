"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var _clipboard = _interopRequireDefault(require("clipboard"));

var _libs = require("../utils/libs");

var _component = require("./component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var CopyBtn = (0, _component.component)({
  clipboard: (0, _libs.Maybe)(null),
  defaultProps: {
    text: ''
  },
  onCreate: function onCreate(self, _ref3) {
    var text = _ref3.text;
    return function ($btn) {
      return self.clipboard = (0, _libs.Maybe)(new _clipboard.default($btn));
    };
  },
  onDestroy: function onDestroy(self) {
    return function () {
      return self.clipboard.map(function (clipboard) {
        return clipboard.destroy();
      });
    };
  },
  render: function render(_ref4) {
    var text = _ref4.text,
        rootProps = _ref4.rootProps;
    return (0, _hyperapp.h)('button', _objectSpread({}, rootProps, {
      'data-clipboard-text': text
    }), 'Copy Code');
  }
});

var CodeExample = function CodeExample(_ref5) {
  var _ref5$tabSize = _ref5.tabSize,
      tabSize = _ref5$tabSize === void 0 ? 4 : _ref5$tabSize,
      config = _ref5.config;
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
  }), '});'), (0, _hyperapp.h)(CopyBtn, {
    text: JSON.stringify(config)
  }));
};

var _default = CodeExample;
exports.default = _default;