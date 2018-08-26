"use strict";

var _PatternLock = _interopRequireDefault(require("./PatternLock"));

var _bdom = require("./example-helpers/bdom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PatternLockCanvas = function PatternLockCanvas() {
  var $canvas = document.createElement('canvas');
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

var App = function App() {
  var _PatternLockCanvas = PatternLockCanvas(),
      lock = _PatternLockCanvas.lock,
      $canvas = _PatternLockCanvas.$canvas;

  var $password = (0, _bdom.input)();
  lock.onComplete(function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        hash = _ref.hash;

    return $password.value = hash;
  });

  var onCheckChange = function onCheckChange(_ref2) {
    var $radio = _ref2.target;

    if ($radio.checked && $radio.value) {
      var theme = $radio.value;
      lock.setTheme(theme);
    }
  };

  var themes = ['dark', 'light'];
  var $app = (0, _bdom.div)({}, [(0, _bdom.div)({
    class: 'title'
  }, [(0, _bdom.text)('PatternLockJS')]), (0, _bdom.div)({
    class: 'subtitle'
  }, [(0, _bdom.text)('Draw unlock pattern to generate a hash')]), (0, _bdom.div)({
    class: 'canvas-wrapper'
  }, [$canvas]), (0, _bdom.div)({}, themes.map(function (value) {
    return (0, _bdom.div)({}, [(0, _bdom.h)('label')({}, [(0, _bdom.input)({
      type: 'radio',
      name: 'themes',
      value: value
    }), (0, _bdom.text)("Theme: ".concat(value))])]);
  }).map(function ($el) {
    return (0, _bdom.onChange)(onCheckChange, $el);
  })), (0, _bdom.div)({
    class: 'password'
  }, [(0, _bdom.text)('Your password is: '), $password])]);
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