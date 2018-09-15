"use strict";

var _hyperapp = require("hyperapp");

var _libs = require("./utils/libs");

var _PatternLock = _interopRequireDefault(require("./PatternLock"));

var _Options = require("./example-helpers/Options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var PatternLockCanvas = {
  locker: (0, _libs.Maybe)(null),
  onCreate: function onCreate(_ref) {
    var grid = _ref.grid,
        theme = _ref.theme,
        themeState = _ref.themeState;
    return function ($canvas) {
      var lock = (0, _PatternLock.default)({
        $canvas: $canvas,
        grid: grid,
        theme: theme,
        width: 300,
        height: 430
      });
      PatternLockCanvas.locker = (0, _libs.Maybe)(lock);
    };
  },
  onDestroy: function onDestroy() {
    return function () {
      return PatternLockCanvas.locker.map(function (lock) {
        return lock.destroy();
      });
    };
  },
  onReceiveProps: function onReceiveProps(_ref2) {
    var grid = _ref2.grid,
        theme = _ref2.theme,
        themeState = _ref2.themeState;
    PatternLockCanvas.locker.map(function (lock) {
      return lock.setGrid.apply(lock, _toConsumableArray(grid)).setTheme(theme).setThemeState(themeState);
    });
  },
  render: function render(props) {
    PatternLockCanvas.onReceiveProps(props);
    return (0, _hyperapp.h)('canvas', {
      oncreate: PatternLockCanvas.onCreate(props),
      ondestroy: PatternLockCanvas.onDestroy()
    });
  }
};

var CodeExample = function CodeExample(_ref3) {
  var _ref3$tabSize = _ref3.tabSize,
      tabSize = _ref3$tabSize === void 0 ? 4 : _ref3$tabSize,
      props = _objectWithoutProperties(_ref3, ["tabSize"]);

  return (0, _hyperapp.h)('div', {
    style: 'text-align: left; padding: .7em 1em; background-color: #eee;'
  }, (0, _hyperapp.h)('pre', {}, JSON.stringify(props, 0, tabSize)));
};

var App = {
  state: {
    gridIndex: 1,
    themeIndex: 0,
    themeStateIndex: 0
  },
  actions: {
    setGrid: function setGrid(gridIndex) {
      return function () {
        return {
          gridIndex: gridIndex
        };
      };
    },
    setTheme: function setTheme(themeIndex) {
      return function () {
        return {
          themeIndex: themeIndex
        };
      };
    },
    setThemeState: function setThemeState(themeStateIndex) {
      return function () {
        return {
          themeStateIndex: themeStateIndex
        };
      };
    }
  },
  render: function render(_ref4) {
    var grids = _ref4.grids,
        themes = _ref4.themes,
        themeStates = _ref4.themeStates;
    return function (state, actions) {
      return (0, _hyperapp.h)('div', {}, [(0, _hyperapp.h)('div', {
        class: 'title'
      }, 'PatternLockJS'), (0, _hyperapp.h)('div', {
        class: 'subtitle'
      }, 'Draw unlock pattern to generate a hash'), (0, _hyperapp.h)('div', {
        class: 'canvas-wrapper'
      }, PatternLockCanvas.render({
        onComplete: function onComplete(_ref5) {
          var hash = _ref5.hash;
          return actions.setPassword(hash);
        },
        grid: grids[state.gridIndex],
        theme: themes[state.themeIndex],
        themeState: themeStates[state.themeStateIndex]
      })), (0, _hyperapp.h)('div', {
        class: 'password'
      }, ['Your password is: ', (0, _hyperapp.h)('input', {
        value: ''
      })]), (0, _hyperapp.h)(CodeExample, {
        state: state
      }), (0, _hyperapp.h)('div', {}, [(0, _hyperapp.h)(_Options.OptionsGroup, {
        name: 'Grid',
        list: grids,
        selected: state.gridIndex,
        onItemSelect: function onItemSelect(index) {
          return function () {
            return actions.setGrid(index);
          };
        }
      }), (0, _hyperapp.h)(_Options.OptionsGroup, {
        name: 'Theme',
        list: themes,
        selected: state.themeIndex,
        onItemSelect: function onItemSelect(index) {
          return function () {
            return actions.setTheme(index);
          };
        }
      }), (0, _hyperapp.h)(_Options.OptionsGroup, {
        name: 'Theme State',
        list: themeStates,
        selected: state.themeStateIndex,
        onItemSelect: function onItemSelect(index) {
          return function () {
            return actions.setThemeState(index);
          };
        }
      })])]);
    };
  }
};
document.addEventListener('DOMContentLoaded', function () {
  var $appRoot = document.getElementById('root');
  var view = App.render({
    grids: [[2, 2], [3, 3], [3, 4], [4, 4], [4, 5]],
    themes: ['dark', 'light'],
    themeStates: ['default', 'success', 'failure']
  });
  (0, _hyperapp.app)(App.state, App.actions, view, $appRoot);
});