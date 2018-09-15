"use strict";

var _hyperapp = require("hyperapp");

var _PatternLock = _interopRequireDefault(require("./PatternLock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { div, input, text, h, onChange, render } from './example-helpers/bdom';
// const PatternLockCanvas = () => {
// 	const $canvas = h('canvas')();
// 	const lock = PatternLock({
// 		$canvas,
// 		width: 300,
// 		height: 430,
// 		grid: [ 3, 3 ],
// 	});
// 	// Right L, Diagonal L
// 	lock.matchHash([ 'LTExNjI0MjcxOTA=', 'MTQ2NjgyMjczMw==', 'LTYyMzEzNTM2Ng==' ])
// 		.onSuccess(() => lock.setThemeState('success'))
// 		.onFailure(() => lock.setThemeState('failure'));
// 	lock.onStart(() => lock.setThemeState('default'));
// 	return { lock, $canvas };
// };
// const App = ({ grids, themes, themeStates }) => {
// 	const { lock, $canvas } = PatternLockCanvas();
// 	const state = {
// 		grid: { value: '', index: 1 },
// 		theme: { value: '', index: 0 },
// 		themeState: { value: '', index: 0 },
// 	};
// 	const $password = input();
// 	lock.onComplete(({ hash } = {}) => $password.value = hash);
// 	const $codeBox = div();
// 	const renderCodeBox = () => render(CodeExample({ ...state }), $codeBox);
// 	renderCodeBox();
// 	const stateChange = (stateName, action) => (value, index) => {
// 		state[stateName] = { value, index };
// 		renderCodeBox();
// 		return action(value);
// 	};
// 	const $app = div({}, [
// 		div({ class: 'title' }, [ text('PatternLockJS') ]),
// 		div({ class: 'subtitle' }, [ text('Draw unlock pattern to generate a hash') ]),
// 		div({ class: 'canvas-wrapper' }, [ $canvas ]),
// 		div({ class: 'password' }, [ text('Your password is: '), $password ]),
// 		div({}, [ $codeBox ]),
// 		div({}, [
// 			OptionsGroup({
// 				name: 'Grid',
// 				list: grids,
// 				selected: state.grid.index,
// 				onItemSelect: stateChange('grid', grid => () => lock.setGrid(...grid)),
// 			}),
// 			OptionsGroup({
// 				name: 'Theme',
// 				list: themes,
// 				selected: state.theme.index,
// 				onItemSelect: stateChange('theme', theme => () => lock.setTheme(theme)),
// 			}),
// 			OptionsGroup({
// 				name: 'Theme State',
// 				list: themeStates,
// 				selected: state.themeState.index,
// 				onItemSelect: stateChange('themeState', ts => () => lock.setThemeState(ts)),
// 			}),
// 		]),
// 	]);
// 	return { $app, lock };
// };
var OptionItem = function OptionItem(_ref) {
  var name = _ref.name,
      value = _ref.value,
      isSelected = _ref.isSelected,
      onSelect = _ref.onSelect;
  return (0, _hyperapp.h)('label', {
    style: 'padding: .3em .5em;'
  }, [(0, _hyperapp.h)('input', _objectSpread({
    type: 'radio',
    name: name,
    onchange: onSelect
  }, isSelected ? {
    checked: true
  } : {})), value.toString()]);
};

var OptionsGroup = function OptionsGroup(_ref2) {
  var list = _ref2.list,
      onItemSelect = _ref2.onItemSelect,
      name = _ref2.name,
      selected = _ref2.selected;
  return (0, _hyperapp.h)('div', {
    style: 'padding: 1em 0;'
  }, [(0, _hyperapp.h)('div', {
    style: 'font-size: 1.3em;'
  }, (0, _hyperapp.h)('strong', {}, name)), (0, _hyperapp.h)('div', {}, list.map(function (item, index) {
    return OptionItem({
      name: name,
      value: item,
      isSelected: index === selected,
      onSelect: onItemSelect(index)
    });
  }))]);
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
    themeStateIndex: 0,
    count: 0
  },
  actions: {
    incr: function incr() {
      return function (_ref4) {
        var count = _ref4.count;
        return {
          count: count + 1
        };
      };
    },
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
  render: function render(_ref5) {
    var grids = _ref5.grids,
        themes = _ref5.themes,
        themeStates = _ref5.themeStates;
    return function (state, actions) {
      return (0, _hyperapp.h)('div', {}, [CodeExample({
        state: state
      }), (0, _hyperapp.h)('div', {}, [OptionsGroup({
        name: 'Grid',
        list: grids,
        selected: state.gridIndex,
        onItemSelect: function onItemSelect(index) {
          return function () {
            return actions.setGrid(index);
          };
        }
      }), OptionsGroup({
        name: 'Theme',
        list: themes,
        selected: state.themeIndex,
        onItemSelect: function onItemSelect(index) {
          return function () {
            return actions.setTheme(index);
          };
        }
      }), OptionsGroup({
        name: 'Theme State',
        list: themeStates,
        selected: state.themeStateIndex,
        onItemSelect: function onItemSelect(index) {
          return function () {
            return actions.setThemeState(index);
          };
        }
      })]), (0, _hyperapp.h)('button', {
        onclick: actions.incr
      }, 'incr')]);
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