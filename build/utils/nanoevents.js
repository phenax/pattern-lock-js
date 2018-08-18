"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var NanoEvents = function NanoEvents() {
  this.events = {};
};

exports.default = NanoEvents;
NanoEvents.prototype = {
  on: function on(event, cb) {
    var _this = this;

    event = this.events[event] = this.events[event] || [];
    event.push(cb);
    return function () {
      return _this.off(event, cb);
    };
  },
  off: function off(event, cb) {
    event = this.events[event] = this.events[event] || [];
    event.splice(event.indexOf(cb) >>> 0, 1);
  },
  emit: function emit(event) {
    var _this2 = this;

    var list = this.events[event];
    if (!list || !list[0]) return;
    var args = list.slice.call(arguments, 1);
    list.slice().map(function (i) {
      return i.apply(_this2, args);
    });
  }
};