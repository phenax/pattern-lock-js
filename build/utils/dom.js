"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPixelRatio = exports.raf = exports.registerEvent = exports.unregisterEvent = void 0;

var unregisterEvent = function unregisterEvent(target, event, fn) {
  return event.split(' ').forEach(function (ev) {
    return target.removeEventListener(ev, fn, {
      passive: false
    });
  });
};

exports.unregisterEvent = unregisterEvent;

var registerEvent = function registerEvent(target, event, fn) {
  event.split(' ').forEach(function (ev) {
    return target.addEventListener(ev, fn, {
      passive: false
    });
  });
  return function () {
    return unregisterEvent(target, event, fn);
  };
};

exports.registerEvent = registerEvent;

var raf = requestAnimationFrame || function (fn) {
  return setTimeout(fn, 16);
};

exports.raf = raf;

var getPixelRatio = function getPixelRatio(ctx) {
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStorePixelRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  return devicePixelRatio / backingStorePixelRatio;
};

exports.getPixelRatio = getPixelRatio;