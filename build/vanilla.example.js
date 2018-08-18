"use strict";

var _PatternLock = _interopRequireDefault(require("./PatternLock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var lock = (0, _PatternLock.default)({
    $canvas: document.querySelector('#patternLock'),
    width: 300,
    height: 430,
    grid: [3, 3]
  }); // Right L, Diagonal L

  lock.matchHash('LTU2MTIyNjM0Ng==', 'MTk1OTMwNzY2NQ==').onSuccess(function () {
    return lock.setTheme('success');
  }).onFailure(function () {
    return lock.setTheme('failure');
  });
  var $password = document.querySelector('.js-password');
  lock.onStart(function () {
    return lock.setTheme('default');
  });
  lock.onComplete(function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        hash = _ref.hash;

    return $password.value = hash;
  });
});