"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MATCH_FAILURE = exports.MATCH_SUCCESS = void 0;

var _EventBus = _interopRequireDefault(require("./EventBus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MATCH_SUCCESS = 'MATCH_SUCCESS';
exports.MATCH_SUCCESS = MATCH_SUCCESS;
var MATCH_FAILURE = 'MATCH_FAILURE'; // isAMatch :: (Array, any) -> Boolean

exports.MATCH_FAILURE = MATCH_FAILURE;

var isAMatch = function isAMatch(samples, value) {
  return samples.indexOf(value) !== -1;
}; // Matcher :: Array<String> -> Matcher


var _default = function _default(values, eventBus) {
  var events = eventBus || (0, _EventBus.default)();

  var emitSuccess = function emitSuccess() {
    return events.emit(MATCH_SUCCESS);
  };

  var emitFailure = function emitFailure() {
    return events.emit(MATCH_FAILURE);
  };

  var matcher = {
    check: function check(val) {
      return isAMatch(values, val) ? emitSuccess(val) : emitFailure(val);
    },
    onSuccess: function onSuccess(fn) {
      events.on(MATCH_SUCCESS, fn);
      return matcher;
    },
    onFailure: function onFailure(fn) {
      events.on(MATCH_FAILURE, fn);
      return matcher;
    }
  };
  return matcher;
};

exports.default = _default;