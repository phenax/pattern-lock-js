"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(values) {
  var _onSuccess = function _onSuccess() {};

  var _onFailure = function _onFailure() {};

  var matcher = {
    check: function check(val) {
      return values.indexOf(val) !== -1 ? _onSuccess() : _onFailure();
    },
    onSuccess: function onSuccess(fn) {
      _onSuccess = fn;
      return matcher;
    },
    onFailure: function onFailure(fn) {
      _onFailure = fn;
      return matcher;
    }
  };
  return matcher;
};

exports.default = _default;