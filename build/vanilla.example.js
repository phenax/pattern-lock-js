"use strict";

var _hyperapp = require("hyperapp");

var _Options = require("./example-helpers/Options");

var _CodeExample = _interopRequireDefault(require("./example-helpers/CodeExample"));

var _PatternLockCanvas = _interopRequireDefault(require("./example-helpers/PatternLockCanvas"));

var _component = require("./example-helpers/component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = (0, _component.component)({
  state: {
    gridIndex: 1,
    themeIndex: 0,
    themeStateIndex: 0,
    password: ''
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
    },
    setPassword: function setPassword(password) {
      return function () {
        return {
          password: password
        };
      };
    }
  },
  render: function render(_ref) {
    var grids = _ref.grids,
        themes = _ref.themes,
        themeStates = _ref.themeStates;
    return function (state, actions) {
      return (0, _hyperapp.h)('div', {}, [(0, _hyperapp.h)('div', {
        class: 'title'
      }, 'PatternLockJS'), (0, _hyperapp.h)('div', {
        class: 'subtitle'
      }, 'Draw unlock pattern to generate a hash'), (0, _hyperapp.h)('div', {
        class: 'canvas-wrapper'
      }, (0, _hyperapp.h)(_PatternLockCanvas.default, {
        onComplete: function onComplete(_ref2) {
          var hash = _ref2.hash;
          return actions.setPassword(hash);
        },
        grid: grids[state.gridIndex],
        theme: themes[state.themeIndex],
        themeState: themeStates[state.themeStateIndex]
      })), (0, _hyperapp.h)('div', {
        class: 'password'
      }, ['Generated hash: ', (0, _hyperapp.h)('input', {
        value: state.password
      })]), (0, _hyperapp.h)(_CodeExample.default, {
        config: {
          width: 300,
          height: 430,
          grid: grids[state.gridIndex],
          theme: themes[state.themeIndex]
        }
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
});
document.addEventListener('DOMContentLoaded', function () {
  var _App$instance = App.instance,
      state = _App$instance.state,
      actions = _App$instance.actions;
  var view = (0, _hyperapp.h)(App, {
    grids: [[2, 2], [3, 3], [3, 4], [4, 4], [4, 5]],
    themes: ['dark', 'light'],
    themeStates: ['default', 'success', 'failure']
  });
  (0, _hyperapp.app)(state, actions, view, document.getElementById('root'));
});