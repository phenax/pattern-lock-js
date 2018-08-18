"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var EventBus = function EventBus() {
  var eventMap = {};

  var off = function off(eventName, cb) {
    var fns = eventMap[eventName] = eventMap[eventName] || [];
    return fns.splice(fns.indexOf(cb) >>> 0, 1);
  };

  var on = function on(eventName, cb) {
    var fns = eventMap[eventName] = eventMap[eventName] || [];
    fns.push(cb);
    return off.bind(null, fns, cb);
  };

  var emit = function emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var fns = eventMap[event];
    if (!fns || !fns.length) return [];
    return fns.map(function (fn) {
      return fn.apply(void 0, args);
    });
  };

  return {
    on: on,
    off: off,
    emit: emit
  };
};

var _default = EventBus;
exports.default = _default;