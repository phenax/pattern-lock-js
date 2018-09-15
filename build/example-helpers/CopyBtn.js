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

var CopyBtn = (0, _component.component)({
  clipboard: (0, _libs.Maybe)(null),
  defaultProps: {
    text: ''
  },
  onCreate: function onCreate(self, _ref) {
    var text = _ref.text;
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
  render: function render(_ref2) {
    var text = _ref2.text,
        rootProps = _ref2.rootProps;
    return (0, _hyperapp.h)('button', _objectSpread({}, rootProps, {
      'data-clipboard-text': text
    }), 'Copy Code');
  }
});
var _default = CopyBtn;
exports.default = _default;