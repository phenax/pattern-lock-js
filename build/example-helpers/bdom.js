"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.onChange = exports.onEvent = exports.input = exports.div = exports.text = exports.h = void 0;

var h = function h(tagName) {
  return function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var $el = document.createElement(tagName);
    Object.keys(props).forEach(function (key) {
      return $el.setAttribute(key, props[key]);
    });
    Object.assign($el.style, props.style);
    children.forEach(function (child) {
      return $el.appendChild(child);
    });
    return $el;
  };
};

exports.h = h;

var text = function text(str) {
  return document.createTextNode(str);
};

exports.text = text;
var div = h('div');
exports.div = div;
var input = h('input');
exports.input = input;

var onEvent = function onEvent(ev) {
  return function (fn, $el) {
    $el.addEventListener(ev, fn);
    return $el;
  };
};

exports.onEvent = onEvent;
var onChange = onEvent('change');
exports.onChange = onChange;

var render = function render($child, $parent) {
  return $parent.appendChild($child);
};

exports.render = render;