"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hyperapp = require("hyperapp");

var _libs = require("../utils/libs");

var _PatternLock = _interopRequireDefault(require("../PatternLock"));

var _component = require("./component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var PatternLockCanvas = (0, _component.component)({
  locker: (0, _libs.Maybe)(null),
  defaultProps: {
    onComplete: function onComplete() {}
  },
  onCreate: function onCreate(self, _ref) {
    var grid = _ref.grid,
        theme = _ref.theme,
        onComplete = _ref.onComplete;
    return function ($canvas) {
      var lock = (0, _PatternLock.default)({
        $canvas: $canvas,
        grid: grid,
        theme: theme,
        width: 300,
        height: 430
      }); // lock.onComplete(onComplete);

      self.locker = (0, _libs.Maybe)(lock);
    };
  },
  onDestroy: function onDestroy(self) {
    return function () {
      return self.locker.map(function (lock) {
        return lock.destroy();
      });
    };
  },
  onReceiveProps: function onReceiveProps(self, _ref2, prevProps) {
    var grid = _ref2.grid,
        theme = _ref2.theme,
        themeState = _ref2.themeState;
    self.locker.map(function (lock) {
      return lock.setGrid.apply(lock, _toConsumableArray(grid)).setTheme(theme).setThemeState(themeState);
    });
  },
  render: function render(_ref3) {
    var rootProps = _ref3.rootProps,
        props = _objectWithoutProperties(_ref3, ["rootProps"]);

    return (0, _hyperapp.h)('canvas', rootProps);
  }
});
var _default = PatternLockCanvas;
exports.default = _default;