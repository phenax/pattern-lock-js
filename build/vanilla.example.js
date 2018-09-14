"use strict";

var _PatternLock = _interopRequireDefault(require("./PatternLock"));

var _bdom = require("./example-helpers/bdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PatternLockCanvas = function PatternLockCanvas() {
  var $canvas = (0, _bdom.h)('canvas')();
  var lock = (0, _PatternLock.default)({
    $canvas: $canvas,
    width: 300,
    height: 430,
    grid: [3, 3]
  }); // Right L, Diagonal L

  lock.matchHash(['LTExNjI0MjcxOTA=', 'MTQ2NjgyMjczMw==']).onSuccess(function () {
    return lock.setThemeState('success');
  }).onFailure(function () {
    return lock.setThemeState('failure');
  });
  lock.onStart(function () {
    return lock.setThemeState('default');
  });
  return {
    lock: lock,
    $canvas: $canvas
  };
};

var OptionItem = function OptionItem(_ref) {
  var name = _ref.name,
      value = _ref.value,
      isSelected = _ref.isSelected,
      onSelect = _ref.onSelect;
  return (0, _bdom.h)('label')({
    style: 'padding: .3em .5em;'
  }, [(0, _bdom.onChange)(onSelect, (0, _bdom.input)(_defineProperty({
    type: 'radio',
    name: name
  }, isSelected ? 'checked' : 'unchecked', true))), (0, _bdom.text)(value)]);
};

var OptionsGroup = function OptionsGroup(_ref2) {
  var list = _ref2.list,
      onItemSelect = _ref2.onItemSelect,
      name = _ref2.name,
      selected = _ref2.selected;
  return (0, _bdom.div)({
    style: 'padding: 1em 0;'
  }, [(0, _bdom.div)({
    style: 'font-size: 1.3em;'
  }, [(0, _bdom.h)('strong')({}, [(0, _bdom.text)(name)])]), (0, _bdom.div)({}, list.map(function (item, index) {
    return OptionItem({
      name: name,
      value: item,
      isSelected: index === selected,
      onSelect: onItemSelect(item, index)
    });
  }))]);
};

var App = function App() {
  var _PatternLockCanvas = PatternLockCanvas(),
      lock = _PatternLockCanvas.lock,
      $canvas = _PatternLockCanvas.$canvas;

  var state = {
    grid: {
      value: '',
      index: 1
    },
    theme: {
      value: '',
      index: 0
    },
    themeState: {
      value: '',
      index: 0
    }
  };
  var $password = (0, _bdom.input)();
  lock.onComplete(function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        hash = _ref3.hash;

    return $password.value = hash;
  });

  var stateChange = function stateChange(stateName, action) {
    return function (value, index) {
      state[stateName] = {
        value: value,
        index: index
      };
      return action(value);
    };
  };

  var $app = (0, _bdom.div)({}, [(0, _bdom.div)({
    class: 'title'
  }, [(0, _bdom.text)('PatternLockJS')]), (0, _bdom.div)({
    class: 'subtitle'
  }, [(0, _bdom.text)('Draw unlock pattern to generate a hash')]), (0, _bdom.div)({
    class: 'canvas-wrapper'
  }, [$canvas]), (0, _bdom.div)({
    class: 'password'
  }, [(0, _bdom.text)('Your password is: '), $password]), (0, _bdom.div)({}, [OptionsGroup({
    name: 'Grid',
    list: [[2, 2], [3, 3], [3, 4], [4, 4], [4, 5]],
    selected: state.grid.index,
    onItemSelect: stateChange('grid', function (grid) {
      return function () {
        return lock.setGrid.apply(lock, _toConsumableArray(grid));
      };
    })
  }), OptionsGroup({
    name: 'Theme',
    list: ['dark', 'light'],
    selected: state.theme.index,
    onItemSelect: stateChange('theme', function (theme) {
      return function () {
        return lock.setTheme(theme);
      };
    })
  }), OptionsGroup({
    name: 'Theme State',
    list: ['default', 'success', 'failure'],
    selected: state.themeState.index,
    onItemSelect: stateChange('themeState', function (ts) {
      return function () {
        return lock.setThemeState(ts);
      };
    })
  })])]);
  return {
    $app: $app,
    lock: lock
  };
};

document.addEventListener('DOMContentLoaded', function () {
  var _App = App(),
      $app = _App.$app,
      lock = _App.lock;

  var $appRoot = document.getElementById('root');
  (0, _bdom.render)($app, $appRoot);
  lock.recalculateBounds();
});