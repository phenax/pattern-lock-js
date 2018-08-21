"use strict";

var _PatternLock = _interopRequireDefault(require("./PatternLock"));

var _bdom = require("./example-helpers/bdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var PatternLockCanvas = function PatternLockCanvas() {
  var $canvas = (0, _bdom.h)('canvas')();
  var lock = (0, _PatternLock.default)({
    $canvas: $canvas,
    width: 300,
    height: 430,
    grid: [3, 3]
  }); // Right L, Diagonal L

  lock.matchHash('LTExNjI0MjcxOTA=', 'MTQ2NjgyMjczMw==').onSuccess(function () {
    return lock.setTheme('success');
  }).onFailure(function () {
    return lock.setTheme('failure');
  });
  lock.onStart(function () {
    return lock.setTheme('default');
  });
  return {
    lock: lock,
    $canvas: $canvas
  };
};

var OptionsGroup = function OptionsGroup(_ref) {
  var list = _ref.list,
      onSelect = _ref.onSelect,
      name = _ref.name;
  return (0, _bdom.div)({
    style: 'padding: 1em 0;'
  }, [(0, _bdom.div)({
    style: 'font-size: 1.3em;'
  }, [(0, _bdom.h)('strong')({}, [(0, _bdom.text)(name)])]), (0, _bdom.div)({}, list.map(function (item, index) {
    return (0, _bdom.h)('label')({
      style: 'padding: .3em .5em;'
    }, [(0, _bdom.onChange)(onSelect(item, index), (0, _bdom.input)({
      type: 'radio',
      name: name
    })), (0, _bdom.text)(item)]);
  }))]);
};

var App = function App() {
  var _PatternLockCanvas = PatternLockCanvas(),
      lock = _PatternLockCanvas.lock,
      $canvas = _PatternLockCanvas.$canvas;

  var $password = (0, _bdom.input)();
  lock.onComplete(function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        hash = _ref2.hash;

    return $password.value = hash;
  });

  var onThemeSelect = function onThemeSelect(theme) {
    return function () {
      return lock.setTheme(theme);
    };
  };

  var onGridSelect = function onGridSelect(grid) {
    return function () {
      return lock.setGrid.apply(lock, _toConsumableArray(grid));
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
  }, [(0, _bdom.text)('Your password is: '), $password]), OptionsGroup({
    name: 'Grid',
    list: [[2, 2], [3, 3], [3, 4], [4, 4], [4, 5]],
    onSelect: onGridSelect
  }), OptionsGroup({
    name: 'Theme',
    list: ['default', 'success', 'failure'],
    onSelect: onThemeSelect
  })]);
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