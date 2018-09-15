"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = exports.component = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var component = function component(instance) {
  if (typeof instance === 'function') return instance;

  var noop = function noop() {};

  var render = instance.render,
      defaultProps = instance.defaultProps,
      _instance$onReceivePr = instance.onReceiveProps,
      onReceiveProps = _instance$onReceivePr === void 0 ? noop : _instance$onReceivePr,
      _instance$onCreate = instance.onCreate,
      onCreate = _instance$onCreate === void 0 ? noop : _instance$onCreate,
      _instance$onDestroy = instance.onDestroy,
      onDestroy = _instance$onDestroy === void 0 ? noop : _instance$onDestroy;

  var prevProps = _objectSpread({}, defaultProps);

  var Comp = function Comp(passedProps) {
    var props = _objectSpread({}, defaultProps, passedProps);

    onReceiveProps(instance, props, prevProps);
    prevProps = props;
    return render(_objectSpread({}, props, {
      rootProps: {
        oncreate: onCreate(instance, props),
        ondestroy: onDestroy(instance, props)
      }
    }));
  };

  Comp.instance = instance;
  return Comp;
};

exports.component = component;

var isEqual = function isEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (var key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
};

exports.isEqual = isEqual;