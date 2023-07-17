var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/clipboard/dist/clipboard.js
var require_clipboard = __commonJS({
  "node_modules/clipboard/dist/clipboard.js"(exports, module2) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module2 === "object")
        module2.exports = factory();
      else if (typeof define === "function" && define.amd)
        define([], factory);
      else if (typeof exports === "object")
        exports["ClipboardJS"] = factory();
      else
        root["ClipboardJS"] = factory();
    })(exports, function() {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module3 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module3.exports, module3, module3.exports, __webpack_require__);
            module3.l = true;
            return module3.exports;
          }
          __webpack_require__.m = modules;
          __webpack_require__.c = installedModules;
          __webpack_require__.i = function(value) {
            return value;
          };
          __webpack_require__.d = function(exports2, name, getter) {
            if (!__webpack_require__.o(exports2, name)) {
              Object.defineProperty(exports2, name, {
                /******/
                configurable: false,
                /******/
                enumerable: true,
                /******/
                get: getter
                /******/
              });
            }
          };
          __webpack_require__.n = function(module3) {
            var getter = module3 && module3.__esModule ? (
              /******/
              function getDefault() {
                return module3["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module3;
              }
            );
            __webpack_require__.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__.p = "";
          return __webpack_require__(__webpack_require__.s = 3);
        }([
          /* 0 */
          /***/
          function(module3, exports2, __webpack_require__) {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(global, factory) {
              if (true) {
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module3, __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports2, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module3.exports = __WEBPACK_AMD_DEFINE_RESULT__));
              } else if (typeof exports2 !== "undefined") {
                factory(module3, null);
              } else {
                var mod = {
                  exports: {}
                };
                factory(mod, global.select);
                global.clipboardAction = mod.exports;
              }
            })(this, function(module4, _select) {
              "use strict";
              var _select2 = _interopRequireDefault(_select);
              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                  default: obj
                };
              }
              var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                return typeof obj;
              } : function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
              };
              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              var _createClass = function() {
                function defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor)
                      descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }
                return function(Constructor, protoProps, staticProps) {
                  if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                  if (staticProps)
                    defineProperties(Constructor, staticProps);
                  return Constructor;
                };
              }();
              var ClipboardAction = function() {
                function ClipboardAction2(options) {
                  _classCallCheck(this, ClipboardAction2);
                  this.resolveOptions(options);
                  this.initSelection();
                }
                _createClass(ClipboardAction2, [{
                  key: "resolveOptions",
                  value: function resolveOptions() {
                    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    this.action = options.action;
                    this.container = options.container;
                    this.emitter = options.emitter;
                    this.target = options.target;
                    this.text = options.text;
                    this.trigger = options.trigger;
                    this.selectedText = "";
                  }
                }, {
                  key: "initSelection",
                  value: function initSelection() {
                    if (this.text) {
                      this.selectFake();
                    } else if (this.target) {
                      this.selectTarget();
                    }
                  }
                }, {
                  key: "selectFake",
                  value: function selectFake() {
                    var _this = this;
                    var isRTL = document.documentElement.getAttribute("dir") == "rtl";
                    this.removeFake();
                    this.fakeHandlerCallback = function() {
                      return _this.removeFake();
                    };
                    this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || true;
                    this.fakeElem = document.createElement("textarea");
                    this.fakeElem.style.fontSize = "12pt";
                    this.fakeElem.style.border = "0";
                    this.fakeElem.style.padding = "0";
                    this.fakeElem.style.margin = "0";
                    this.fakeElem.style.position = "absolute";
                    this.fakeElem.style[isRTL ? "right" : "left"] = "-9999px";
                    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                    this.fakeElem.style.top = yPosition + "px";
                    this.fakeElem.setAttribute("readonly", "");
                    this.fakeElem.value = this.text;
                    this.container.appendChild(this.fakeElem);
                    this.selectedText = (0, _select2.default)(this.fakeElem);
                    this.copyText();
                  }
                }, {
                  key: "removeFake",
                  value: function removeFake() {
                    if (this.fakeHandler) {
                      this.container.removeEventListener("click", this.fakeHandlerCallback);
                      this.fakeHandler = null;
                      this.fakeHandlerCallback = null;
                    }
                    if (this.fakeElem) {
                      this.container.removeChild(this.fakeElem);
                      this.fakeElem = null;
                    }
                  }
                }, {
                  key: "selectTarget",
                  value: function selectTarget() {
                    this.selectedText = (0, _select2.default)(this.target);
                    this.copyText();
                  }
                }, {
                  key: "copyText",
                  value: function copyText() {
                    var succeeded = void 0;
                    try {
                      succeeded = document.execCommand(this.action);
                    } catch (err) {
                      succeeded = false;
                    }
                    this.handleResult(succeeded);
                  }
                }, {
                  key: "handleResult",
                  value: function handleResult(succeeded) {
                    this.emitter.emit(succeeded ? "success" : "error", {
                      action: this.action,
                      text: this.selectedText,
                      trigger: this.trigger,
                      clearSelection: this.clearSelection.bind(this)
                    });
                  }
                }, {
                  key: "clearSelection",
                  value: function clearSelection() {
                    if (this.trigger) {
                      this.trigger.focus();
                    }
                    window.getSelection().removeAllRanges();
                  }
                }, {
                  key: "destroy",
                  value: function destroy() {
                    this.removeFake();
                  }
                }, {
                  key: "action",
                  set: function set() {
                    var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "copy";
                    this._action = action;
                    if (this._action !== "copy" && this._action !== "cut") {
                      throw new Error('Invalid "action" value, use either "copy" or "cut"');
                    }
                  },
                  get: function get() {
                    return this._action;
                  }
                }, {
                  key: "target",
                  set: function set(target) {
                    if (target !== void 0) {
                      if (target && (typeof target === "undefined" ? "undefined" : _typeof(target)) === "object" && target.nodeType === 1) {
                        if (this.action === "copy" && target.hasAttribute("disabled")) {
                          throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }
                        if (this.action === "cut" && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) {
                          throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                        }
                        this._target = target;
                      } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                      }
                    }
                  },
                  get: function get() {
                    return this._target;
                  }
                }]);
                return ClipboardAction2;
              }();
              module4.exports = ClipboardAction;
            });
          },
          /* 1 */
          /***/
          function(module3, exports2, __webpack_require__) {
            var is = __webpack_require__(6);
            var delegate = __webpack_require__(5);
            function listen(target, type, callback) {
              if (!target && !type && !callback) {
                throw new Error("Missing required arguments");
              }
              if (!is.string(type)) {
                throw new TypeError("Second argument must be a String");
              }
              if (!is.fn(callback)) {
                throw new TypeError("Third argument must be a Function");
              }
              if (is.node(target)) {
                return listenNode(target, type, callback);
              } else if (is.nodeList(target)) {
                return listenNodeList(target, type, callback);
              } else if (is.string(target)) {
                return listenSelector(target, type, callback);
              } else {
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
              }
            }
            function listenNode(node, type, callback) {
              node.addEventListener(type, callback);
              return {
                destroy: function() {
                  node.removeEventListener(type, callback);
                }
              };
            }
            function listenNodeList(nodeList, type, callback) {
              Array.prototype.forEach.call(nodeList, function(node) {
                node.addEventListener(type, callback);
              });
              return {
                destroy: function() {
                  Array.prototype.forEach.call(nodeList, function(node) {
                    node.removeEventListener(type, callback);
                  });
                }
              };
            }
            function listenSelector(selector, type, callback) {
              return delegate(document.body, selector, type, callback);
            }
            module3.exports = listen;
          },
          /* 2 */
          /***/
          function(module3, exports2) {
            function E() {
            }
            E.prototype = {
              on: function(name, callback, ctx) {
                var e = this.e || (this.e = {});
                (e[name] || (e[name] = [])).push({
                  fn: callback,
                  ctx
                });
                return this;
              },
              once: function(name, callback, ctx) {
                var self = this;
                function listener() {
                  self.off(name, listener);
                  callback.apply(ctx, arguments);
                }
                ;
                listener._ = callback;
                return this.on(name, listener, ctx);
              },
              emit: function(name) {
                var data = [].slice.call(arguments, 1);
                var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                var i = 0;
                var len = evtArr.length;
                for (i; i < len; i++) {
                  evtArr[i].fn.apply(evtArr[i].ctx, data);
                }
                return this;
              },
              off: function(name, callback) {
                var e = this.e || (this.e = {});
                var evts = e[name];
                var liveEvents = [];
                if (evts && callback) {
                  for (var i = 0, len = evts.length; i < len; i++) {
                    if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                      liveEvents.push(evts[i]);
                  }
                }
                liveEvents.length ? e[name] = liveEvents : delete e[name];
                return this;
              }
            };
            module3.exports = E;
          },
          /* 3 */
          /***/
          function(module3, exports2, __webpack_require__) {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(global, factory) {
              if (true) {
                !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module3, __webpack_require__(0), __webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports2, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module3.exports = __WEBPACK_AMD_DEFINE_RESULT__));
              } else if (typeof exports2 !== "undefined") {
                factory(module3, null, null, null);
              } else {
                var mod = {
                  exports: {}
                };
                factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
                global.clipboard = mod.exports;
              }
            })(this, function(module4, _clipboardAction, _tinyEmitter, _goodListener) {
              "use strict";
              var _clipboardAction2 = _interopRequireDefault(_clipboardAction);
              var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);
              var _goodListener2 = _interopRequireDefault(_goodListener);
              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                  default: obj
                };
              }
              var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                return typeof obj;
              } : function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
              };
              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
                }
              }
              var _createClass = function() {
                function defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor)
                      descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                  }
                }
                return function(Constructor, protoProps, staticProps) {
                  if (protoProps)
                    defineProperties(Constructor.prototype, protoProps);
                  if (staticProps)
                    defineProperties(Constructor, staticProps);
                  return Constructor;
                };
              }();
              function _possibleConstructorReturn(self, call) {
                if (!self) {
                  throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
              }
              function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                  throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                  constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                  }
                });
                if (superClass)
                  Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
              }
              var Clipboard2 = function(_Emitter) {
                _inherits(Clipboard3, _Emitter);
                function Clipboard3(trigger, options) {
                  _classCallCheck(this, Clipboard3);
                  var _this = _possibleConstructorReturn(this, (Clipboard3.__proto__ || Object.getPrototypeOf(Clipboard3)).call(this));
                  _this.resolveOptions(options);
                  _this.listenClick(trigger);
                  return _this;
                }
                _createClass(Clipboard3, [{
                  key: "resolveOptions",
                  value: function resolveOptions() {
                    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    this.action = typeof options.action === "function" ? options.action : this.defaultAction;
                    this.target = typeof options.target === "function" ? options.target : this.defaultTarget;
                    this.text = typeof options.text === "function" ? options.text : this.defaultText;
                    this.container = _typeof(options.container) === "object" ? options.container : document.body;
                  }
                }, {
                  key: "listenClick",
                  value: function listenClick(trigger) {
                    var _this2 = this;
                    this.listener = (0, _goodListener2.default)(trigger, "click", function(e) {
                      return _this2.onClick(e);
                    });
                  }
                }, {
                  key: "onClick",
                  value: function onClick(e) {
                    var trigger = e.delegateTarget || e.currentTarget;
                    if (this.clipboardAction) {
                      this.clipboardAction = null;
                    }
                    this.clipboardAction = new _clipboardAction2.default({
                      action: this.action(trigger),
                      target: this.target(trigger),
                      text: this.text(trigger),
                      container: this.container,
                      trigger,
                      emitter: this
                    });
                  }
                }, {
                  key: "defaultAction",
                  value: function defaultAction(trigger) {
                    return getAttributeValue("action", trigger);
                  }
                }, {
                  key: "defaultTarget",
                  value: function defaultTarget(trigger) {
                    var selector = getAttributeValue("target", trigger);
                    if (selector) {
                      return document.querySelector(selector);
                    }
                  }
                }, {
                  key: "defaultText",
                  value: function defaultText(trigger) {
                    return getAttributeValue("text", trigger);
                  }
                }, {
                  key: "destroy",
                  value: function destroy() {
                    this.listener.destroy();
                    if (this.clipboardAction) {
                      this.clipboardAction.destroy();
                      this.clipboardAction = null;
                    }
                  }
                }], [{
                  key: "isSupported",
                  value: function isSupported() {
                    var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"];
                    var actions = typeof action === "string" ? [action] : action;
                    var support = !!document.queryCommandSupported;
                    actions.forEach(function(action2) {
                      support = support && !!document.queryCommandSupported(action2);
                    });
                    return support;
                  }
                }]);
                return Clipboard3;
              }(_tinyEmitter2.default);
              function getAttributeValue(suffix, element) {
                var attribute = "data-clipboard-" + suffix;
                if (!element.hasAttribute(attribute)) {
                  return;
                }
                return element.getAttribute(attribute);
              }
              module4.exports = Clipboard2;
            });
          },
          /* 4 */
          /***/
          function(module3, exports2) {
            var DOCUMENT_NODE_TYPE = 9;
            if (typeof Element !== "undefined" && !Element.prototype.matches) {
              var proto = Element.prototype;
              proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
            }
            function closest(element, selector) {
              while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                if (typeof element.matches === "function" && element.matches(selector)) {
                  return element;
                }
                element = element.parentNode;
              }
            }
            module3.exports = closest;
          },
          /* 5 */
          /***/
          function(module3, exports2, __webpack_require__) {
            var closest = __webpack_require__(4);
            function _delegate(element, selector, type, callback, useCapture) {
              var listenerFn = listener.apply(this, arguments);
              element.addEventListener(type, listenerFn, useCapture);
              return {
                destroy: function() {
                  element.removeEventListener(type, listenerFn, useCapture);
                }
              };
            }
            function delegate(elements, selector, type, callback, useCapture) {
              if (typeof elements.addEventListener === "function") {
                return _delegate.apply(null, arguments);
              }
              if (typeof type === "function") {
                return _delegate.bind(null, document).apply(null, arguments);
              }
              if (typeof elements === "string") {
                elements = document.querySelectorAll(elements);
              }
              return Array.prototype.map.call(elements, function(element) {
                return _delegate(element, selector, type, callback, useCapture);
              });
            }
            function listener(element, selector, type, callback) {
              return function(e) {
                e.delegateTarget = closest(e.target, selector);
                if (e.delegateTarget) {
                  callback.call(element, e);
                }
              };
            }
            module3.exports = delegate;
          },
          /* 6 */
          /***/
          function(module3, exports2) {
            exports2.node = function(value) {
              return value !== void 0 && value instanceof HTMLElement && value.nodeType === 1;
            };
            exports2.nodeList = function(value) {
              var type = Object.prototype.toString.call(value);
              return value !== void 0 && (type === "[object NodeList]" || type === "[object HTMLCollection]") && "length" in value && (value.length === 0 || exports2.node(value[0]));
            };
            exports2.string = function(value) {
              return typeof value === "string" || value instanceof String;
            };
            exports2.fn = function(value) {
              var type = Object.prototype.toString.call(value);
              return type === "[object Function]";
            };
          },
          /* 7 */
          /***/
          function(module3, exports2) {
            function select(element) {
              var selectedText;
              if (element.nodeName === "SELECT") {
                element.focus();
                selectedText = element.value;
              } else if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
                var isReadOnly = element.hasAttribute("readonly");
                if (!isReadOnly) {
                  element.setAttribute("readonly", "");
                }
                element.select();
                element.setSelectionRange(0, element.value.length);
                if (!isReadOnly) {
                  element.removeAttribute("readonly");
                }
                selectedText = element.value;
              } else {
                if (element.hasAttribute("contenteditable")) {
                  element.focus();
                }
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(element);
                selection.removeAllRanges();
                selection.addRange(range);
                selectedText = selection.toString();
              }
              return selectedText;
            }
            module3.exports = select;
          }
          /******/
        ])
      );
    });
  }
});

// node_modules/hyperapp/src/index.js
function h(name, attributes) {
  var rest = [];
  var children = [];
  var length = arguments.length;
  while (length-- > 2)
    rest.push(arguments[length]);
  while (rest.length) {
    var node = rest.pop();
    if (node && node.pop) {
      for (length = node.length; length--; ) {
        rest.push(node[length]);
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(node);
    }
  }
  return typeof name === "function" ? name(attributes || {}, children) : {
    nodeName: name,
    attributes: attributes || {},
    children,
    key: attributes && attributes.key
  };
}
function app(state, actions, view, container) {
  var map = [].map;
  var rootElement = container && container.children[0] || null;
  var oldNode = rootElement && recycleElement(rootElement);
  var lifecycle = [];
  var skipRender;
  var isRecycling = true;
  var globalState = clone(state);
  var wiredActions = wireStateToActions([], globalState, clone(actions));
  scheduleRender();
  return wiredActions;
  function recycleElement(element) {
    return {
      nodeName: element.nodeName.toLowerCase(),
      attributes: {},
      children: map.call(element.childNodes, function(element2) {
        return element2.nodeType === 3 ? element2.nodeValue : recycleElement(element2);
      })
    };
  }
  function resolveNode(node) {
    return typeof node === "function" ? resolveNode(node(globalState, wiredActions)) : node != null ? node : "";
  }
  function render() {
    skipRender = !skipRender;
    var node = resolveNode(view);
    if (container && !skipRender) {
      rootElement = patch(container, rootElement, oldNode, oldNode = node);
    }
    isRecycling = false;
    while (lifecycle.length)
      lifecycle.pop()();
  }
  function scheduleRender() {
    if (!skipRender) {
      skipRender = true;
      setTimeout(render);
    }
  }
  function clone(target, source) {
    var out = {};
    for (var i in target)
      out[i] = target[i];
    for (var i in source)
      out[i] = source[i];
    return out;
  }
  function setPartialState(path, value, source) {
    var target = {};
    if (path.length) {
      target[path[0]] = path.length > 1 ? setPartialState(path.slice(1), value, source[path[0]]) : value;
      return clone(source, target);
    }
    return value;
  }
  function getPartialState(path, source) {
    var i = 0;
    while (i < path.length) {
      source = source[path[i++]];
    }
    return source;
  }
  function wireStateToActions(path, state2, actions2) {
    for (var key in actions2) {
      typeof actions2[key] === "function" ? function(key2, action) {
        actions2[key2] = function(data) {
          var result = action(data);
          if (typeof result === "function") {
            result = result(getPartialState(path, globalState), actions2);
          }
          if (result && result !== (state2 = getPartialState(path, globalState)) && !result.then) {
            scheduleRender(
              globalState = setPartialState(
                path,
                clone(state2, result),
                globalState
              )
            );
          }
          return result;
        };
      }(key, actions2[key]) : wireStateToActions(
        path.concat(key),
        state2[key] = clone(state2[key]),
        actions2[key] = clone(actions2[key])
      );
    }
    return actions2;
  }
  function getKey(node) {
    return node ? node.key : null;
  }
  function eventListener(event) {
    return event.currentTarget.events[event.type](event);
  }
  function updateAttribute(element, name, value, oldValue, isSvg) {
    if (name === "key") {
    } else if (name === "style") {
      if (typeof value === "string") {
        element.style.cssText = value;
      } else {
        if (typeof oldValue === "string")
          oldValue = element.style.cssText = "";
        for (var i in clone(oldValue, value)) {
          var style = value == null || value[i] == null ? "" : value[i];
          if (i[0] === "-") {
            element.style.setProperty(i, style);
          } else {
            element.style[i] = style;
          }
        }
      }
    } else {
      if (name[0] === "o" && name[1] === "n") {
        name = name.slice(2);
        if (element.events) {
          if (!oldValue)
            oldValue = element.events[name];
        } else {
          element.events = {};
        }
        element.events[name] = value;
        if (value) {
          if (!oldValue) {
            element.addEventListener(name, eventListener);
          }
        } else {
          element.removeEventListener(name, eventListener);
        }
      } else if (name in element && name !== "list" && name !== "type" && name !== "draggable" && name !== "spellcheck" && name !== "translate" && !isSvg) {
        element[name] = value == null ? "" : value;
      } else if (value != null && value !== false) {
        element.setAttribute(name, value);
      }
      if (value == null || value === false) {
        element.removeAttribute(name);
      }
    }
  }
  function createElement(node, isSvg) {
    var element = typeof node === "string" || typeof node === "number" ? document.createTextNode(node) : (isSvg = isSvg || node.nodeName === "svg") ? document.createElementNS(
      "http://www.w3.org/2000/svg",
      node.nodeName
    ) : document.createElement(node.nodeName);
    var attributes = node.attributes;
    if (attributes) {
      if (attributes.oncreate) {
        lifecycle.push(function() {
          attributes.oncreate(element);
        });
      }
      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(
          createElement(
            node.children[i] = resolveNode(node.children[i]),
            isSvg
          )
        );
      }
      for (var name in attributes) {
        updateAttribute(element, name, attributes[name], null, isSvg);
      }
    }
    return element;
  }
  function updateElement(element, oldAttributes, attributes, isSvg) {
    for (var name in clone(oldAttributes, attributes)) {
      if (attributes[name] !== (name === "value" || name === "checked" ? element[name] : oldAttributes[name])) {
        updateAttribute(
          element,
          name,
          attributes[name],
          oldAttributes[name],
          isSvg
        );
      }
    }
    var cb = isRecycling ? attributes.oncreate : attributes.onupdate;
    if (cb) {
      lifecycle.push(function() {
        cb(element, oldAttributes);
      });
    }
  }
  function removeChildren(element, node) {
    var attributes = node.attributes;
    if (attributes) {
      for (var i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i]);
      }
      if (attributes.ondestroy) {
        attributes.ondestroy(element);
      }
    }
    return element;
  }
  function removeElement(parent, element, node) {
    function done() {
      parent.removeChild(removeChildren(element, node));
    }
    var cb = node.attributes && node.attributes.onremove;
    if (cb) {
      cb(element, done);
    } else {
      done();
    }
  }
  function patch(parent, element, oldNode2, node, isSvg) {
    if (node === oldNode2) {
    } else if (oldNode2 == null || oldNode2.nodeName !== node.nodeName) {
      var newElement = createElement(node, isSvg);
      parent.insertBefore(newElement, element);
      if (oldNode2 != null) {
        removeElement(parent, element, oldNode2);
      }
      element = newElement;
    } else if (oldNode2.nodeName == null) {
      element.nodeValue = node;
    } else {
      updateElement(
        element,
        oldNode2.attributes,
        node.attributes,
        isSvg = isSvg || node.nodeName === "svg"
      );
      var oldKeyed = {};
      var newKeyed = {};
      var oldElements = [];
      var oldChildren = oldNode2.children;
      var children = node.children;
      for (var i = 0; i < oldChildren.length; i++) {
        oldElements[i] = element.childNodes[i];
        var oldKey = getKey(oldChildren[i]);
        if (oldKey != null) {
          oldKeyed[oldKey] = [oldElements[i], oldChildren[i]];
        }
      }
      var i = 0;
      var k = 0;
      while (k < children.length) {
        var oldKey = getKey(oldChildren[i]);
        var newKey = getKey(children[k] = resolveNode(children[k]));
        if (newKeyed[oldKey]) {
          i++;
          continue;
        }
        if (newKey != null && newKey === getKey(oldChildren[i + 1])) {
          if (oldKey == null) {
            removeElement(element, oldElements[i], oldChildren[i]);
          }
          i++;
          continue;
        }
        if (newKey == null || isRecycling) {
          if (oldKey == null) {
            patch(element, oldElements[i], oldChildren[i], children[k], isSvg);
            k++;
          }
          i++;
        } else {
          var keyedNode = oldKeyed[newKey] || [];
          if (oldKey === newKey) {
            patch(element, keyedNode[0], keyedNode[1], children[k], isSvg);
            i++;
          } else if (keyedNode[0]) {
            patch(
              element,
              element.insertBefore(keyedNode[0], oldElements[i]),
              keyedNode[1],
              children[k],
              isSvg
            );
          } else {
            patch(element, oldElements[i], null, children[k], isSvg);
          }
          newKeyed[newKey] = children[k];
          k++;
        }
      }
      while (i < oldChildren.length) {
        if (getKey(oldChildren[i]) == null) {
          removeElement(element, oldElements[i], oldChildren[i]);
        }
        i++;
      }
      for (var i in oldKeyed) {
        if (!newKeyed[i]) {
          removeElement(element, oldKeyed[i][0], oldKeyed[i][1]);
        }
      }
    }
    return element;
  }
}

// src/example-helpers/Options.js
var OptionItem = ({ name, value, checked, onCheck }) => h("label", { style: "padding: .3em .5em;" }, [
  h("input", {
    name,
    checked,
    type: "radio",
    onchange: onCheck
  }),
  value.toString()
]);
var OptionsGroup = ({ list, onItemSelect, name, selected }) => h("div", { style: "padding: 1em 0;" }, [
  h("div", { style: "font-size: 1.3em;" }, h("strong", {}, name)),
  h(
    "div",
    {},
    list.map((value, index) => h(OptionItem, {
      name,
      value,
      key: value,
      checked: index === selected,
      onCheck: onItemSelect(index)
    }))
  )
]);

// src/example-helpers/utils.js
var prettyPrint = (config, tabSize = 4) => {
  const tab = Array(tabSize).fill(" ").join("");
  const predicate = (value) => value.expresssion ? value.expresssion : JSON.stringify(value);
  const code = Object.keys(config).map((key) => `${key}: ${predicate(config[key])},`).map((code2) => `${tab}${code2}`).join("\n");
  return `{
${code}
}`;
};
prettyPrint.expresssion = (expresssion) => ({ expresssion });
var isEqual = (obj1, obj2) => {
  if (obj1 === obj2)
    return true;
  if (Object.keys(obj1).length !== Object.keys(obj2).length)
    return false;
  for (let key in obj1) {
    if (obj1[key] !== obj2[key])
      return false;
  }
  return true;
};

// src/example-helpers/CopyBtn.js
var import_clipboard = __toESM(require_clipboard());

// src/utils/libs.js
var patternToWords = (nodes) => JSON.stringify(nodes);
var hashCode = (str) => {
  if (!str.length)
    return "";
  const hash = str.split("").reduce((a = 0, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  });
  return btoa(hash + "");
};
var gcd = (x, y) => {
  while (y !== 0) {
    let tmp = x;
    x = y;
    y = tmp % y;
  }
  return x;
};
var Maybe = (value) => ({
  value,
  map: (fn) => Maybe(value ? fn(value) : value)
});
var prop = (path, obj) => path.split(".").reduce((acc, key) => acc ? acc[key] : void 0, obj);

// src/example-helpers/component.js
var component = (instance) => {
  if (typeof instance === "function")
    return instance;
  const noop = () => {
  };
  const {
    render,
    defaultProps,
    onReceiveProps = noop,
    onCreate = noop,
    onDestroy = noop
  } = instance;
  let prevProps = { ...defaultProps };
  const Comp = (passedProps) => {
    const props = { ...defaultProps, ...passedProps };
    onReceiveProps(instance, props, prevProps);
    prevProps = props;
    return render({
      ...props,
      rootProps: {
        oncreate: onCreate(instance, props),
        ondestroy: onDestroy(instance, props)
      }
    }, instance);
  };
  Comp.instance = instance;
  return Comp;
};

// src/example-helpers/CopyBtn.js
var copyBtnStyles = {
  position: "absolute",
  right: "0",
  top: "0",
  border: "1px solid #011",
  background: "#0c1e30",
  color: "#fff",
  borderRadius: "0 0 0 10px",
  fontSize: ".8em",
  padding: ".3em 1em"
};
var CopyBtn = component({
  clipboard: Maybe(null),
  defaultProps: { text: "" },
  onCreate: (self, { text }) => ($btn) => self.clipboard = Maybe(new import_clipboard.default($btn)),
  onDestroy: (self) => () => self.clipboard.map((clipboard) => clipboard.destroy()),
  render: ({ text, rootProps, style, ...props }) => h(
    "button",
    {
      ...rootProps,
      "data-clipboard-text": text,
      style: { ...copyBtnStyles, ...style },
      class: "copybtn",
      ...props
    },
    "Copy Code"
  )
});
var CopyBtn_default = CopyBtn;

// src/example-helpers/CodeExample.js
var withColoredText = (color, predicate = (props, children) => children) => (props, children) => h("span", { style: { color } }, predicate(props, children));
var CodeKey = withColoredText("#DB696F");
var FunctionCall = withColoredText("#1abcdc");
var CodeValue = withColoredText("#88CA5F", ({ value }) => JSON.stringify(value));
var IndentedBlock = ({ level = 4 }, children) => h(
  "div",
  { style: { paddingLeft: `${level * 7}px` } },
  children
);
var CodeExample = ({ tabSize = 4, config }) => h(
  "div",
  {
    style: {
      position: "relative",
      fontSize: ".9em",
      textAlign: "left",
      padding: "2em",
      backgroundColor: "#2c3e50",
      color: "#eee",
      fontFamily: '"Courier New", Courier, monospace',
      fontWeight: "bold"
    }
  },
  h(
    "div",
    {},
    h("span", { style: { color: "#cb89e6" } }, "const"),
    " lock = ",
    h(FunctionCall, {}, "PatternLock"),
    "({",
    h(IndentedBlock, {}, [
      h(CodeKey, {}, "$canvas"),
      ": ",
      h("span", {}, [
        "document.",
        h(FunctionCall, {}, "getElementById"),
        "(",
        h(CodeValue, { value: "myCanvas" }),
        ")"
      ]),
      ","
    ]),
    Object.keys(config).map((key) => h(IndentedBlock, {}, [
      h(CodeKey, {}, key),
      ": ",
      h(CodeValue, { value: config[key] }),
      ","
    ])),
    "});"
  ),
  h(CopyBtn_default, {
    text: `const lock = PatternLock(${prettyPrint({
      $canvas: prettyPrint.expresssion('document.getElementById("myCanvas")'),
      ...config
    })});`
  })
);
var CodeExample_default = CodeExample;

// src/utils/EventBus.js
var EventBus = () => {
  const eventMap = {};
  const off = (eventName, cb) => {
    const fns = eventMap[eventName] = eventMap[eventName] || [];
    return fns.splice(fns.indexOf(cb) >>> 0, 1);
  };
  const on = (eventName, cb) => {
    const fns = eventMap[eventName] = eventMap[eventName] || [];
    fns.push(cb);
    return off.bind(null, fns, cb);
  };
  const emit = (event, ...args) => {
    const fns = eventMap[event];
    if (!fns || !fns.length)
      return [];
    return fns.map((fn) => fn(...args));
  };
  return { on, off, emit };
};
var EventBus_default = EventBus;

// src/utils/Matcher.js
var MATCH_SUCCESS = "MATCH_SUCCESS";
var MATCH_FAILURE = "MATCH_FAILURE";
var isAMatch = (samples, value) => samples.indexOf(value) !== -1;
var Matcher_default = (values, eventBus) => {
  const events2 = eventBus || EventBus_default();
  const emitSuccess = () => events2.emit(MATCH_SUCCESS);
  const emitFailure = () => events2.emit(MATCH_FAILURE);
  const matcher = {
    check: (val) => isAMatch(values, val) ? emitSuccess(val) : emitFailure(val),
    onSuccess: (fn) => {
      events2.on(MATCH_SUCCESS, fn);
      return matcher;
    },
    onFailure: (fn) => {
      events2.on(MATCH_FAILURE, fn);
      return matcher;
    }
  };
  return matcher;
};

// src/utils/dom.js
var unregisterEvent = (target, event, fn) => event.split(" ").forEach((ev) => target.removeEventListener(ev, fn, { passive: false }));
var registerEvent = (target, event, fn) => {
  event.split(" ").forEach((ev) => target.addEventListener(ev, fn, { passive: false }));
  return () => unregisterEvent(target, event, fn);
};
var raf = requestAnimationFrame || ((fn) => setTimeout(fn, 16));
var getPixelRatio = (ctx) => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStorePixelRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  return devicePixelRatio / backingStorePixelRatio;
};

// src/utils/themes.js
var themes = {};
var DEFAULT_DIMENS = {
  line_width: 6,
  node_radius: 20,
  node_core: 8,
  node_ring: 1
};
themes.dark = {
  default: {
    colors: {
      accent: "#ae64cd",
      primary: "#ffffff",
      bg: "#2c3e50"
    },
    dimens: DEFAULT_DIMENS
  },
  success: {
    colors: {
      accent: "#51e980"
    }
  },
  failure: {
    colors: {
      accent: "#e74c3c"
    }
  }
};
themes.light = {
  default: {
    colors: {
      accent: "#ae64cd",
      primary: "#34495e",
      bg: "#ecf0f1"
    },
    dimens: DEFAULT_DIMENS
  },
  success: {
    colors: {
      accent: "#27ae60"
    }
  },
  failure: {
    colors: {
      accent: "#e74c3c"
    }
  }
};
var themes_default = themes;

// src/PatternLock.js
var createInvalidOptionError = (option) => new Error(`Invalid or empty ${option} passed`);
var DEFAULT_THEME_NAME = "dark";
var events = {
  PATTERN_COMPLETE: "complete",
  PATTERN_START: "start"
};
var defaultConfig = {
  theme: DEFAULT_THEME_NAME,
  grid: [3, 3],
  width: 300,
  height: 430
};
var PatternLock = class {
  constructor(config) {
    if (!config.$canvas)
      throw createInvalidOptionError("$canvas");
    if (!config.width)
      throw createInvalidOptionError("width");
    if (!config.height)
      throw createInvalidOptionError("height");
    config = { ...defaultConfig, ...config };
    this.$canvas = config.$canvas;
    this.ctx = this.$canvas.getContext("2d");
    this.setDimensions({ width: config.width, height: config.height });
    this.initialize(config);
  }
  setDimensions(dimens) {
    this.dimens = dimens;
    const ratio = getPixelRatio(this.ctx);
    this.$canvas.width = this.dimens.width * ratio;
    this.$canvas.height = this.dimens.height * ratio;
    this.$canvas.style.width = this.dimens.width + "px";
    this.$canvas.style.height = this.dimens.height + "px";
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  initialize({ theme, grid: [rows, cols] }) {
    this._subscriptions = [];
    this.eventBus = EventBus_default();
    this.setTheme(theme, false);
    this.setGrid(rows, cols);
    this.renderGrid();
    this.attachEventHandlers();
  }
  setInitialState() {
    this.coordinates = null;
    this.selectedNodes = [];
    this.lastSelectedNode = null;
  }
  forceRender = () => raf(() => {
    const previousDragState = this._isDragging;
    this._isDragging = true;
    this.calculationLoop(false);
    raf(() => {
      this.renderLoop(false);
      this._isDragging = previousDragState;
    });
  });
  // setGrid :: (Number, Number) -> PatternLock
  setGrid(rows, cols, rerender = true) {
    if (this.rows === rows && this.cols === cols)
      return this;
    this.rows = rows;
    this.cols = cols;
    this.setInitialState();
    this._onResize();
    rerender && this.forceRender();
    return this;
  }
  // setTheme :: (Theme, ?Boolean) -> PatternLock
  setTheme(theme, rerender = true) {
    if (theme === themes_default[this.theme] || theme === this.theme)
      return this;
    if (typeof theme === "string")
      theme = themes_default[theme];
    if (!theme)
      throw createInvalidOptionError("theme");
    this.theme = theme;
    this.setThemeState("default", false);
    rerender && this.forceRender();
    return this;
  }
  // setThemeState :: (State, ?Boolean) -> PatternLock
  setThemeState(themeState, rerender = true) {
    if (!this.theme)
      throw createInvalidOptionError("theme");
    this.themeState = this.theme[themeState || "default"] || {};
    this.themeState.colors = { ...this.theme.default.colors, ...this.themeState.colors };
    this.themeState.dimens = { ...this.theme.default.dimens, ...this.themeState.dimens };
    rerender && this.forceRender();
    return this;
  }
  // Attach event listeners and start frame loops
  attachEventHandlers() {
    const register = (t, ev, fn) => this._subscriptions.push(registerEvent(t, ev, fn));
    register(this.$canvas, "mousedown touchstart", this._onTouchStart);
    register(this.$canvas, "mouseup touchend", this._onTouchStop);
    register(window, "mousemove touchmove", this._onTouchMove);
    register(window, "resize", this._onResize);
    raf(this.renderLoop);
    raf(this.calculationLoop);
  }
  // Event handler stuff start
  destroy = () => this._subscriptions.map((fn) => fn());
  on(event, fn) {
    const subscription = this.eventBus.on(event, fn);
    this._subscriptions.push(subscription);
    return subscription;
  }
  emit = (...args) => this.eventBus.emit(...args);
  onStart = (fn) => this.on(events.PATTERN_START, fn);
  onComplete = (fn) => this.on(events.PATTERN_COMPLETE, fn);
  _emitPatternStart = () => this.emit(events.PATTERN_START, {});
  _emitPatternComplete() {
    const nodes = this.selectedNodes;
    let hash = "";
    let password = "";
    if (nodes.length) {
      password = patternToWords(nodes);
      hash = hashCode(password);
    }
    this.emit(events.PATTERN_COMPLETE, { nodes, password, hash });
  }
  // Event handler stuff end
  // recalculateBounds :: () -> Point
  recalculateBounds = () => {
    let bodyRect = document.body.getBoundingClientRect(), elemRect = this.$canvas.getBoundingClientRect(), offset = elemRect.top - bodyRect.top;
    this.bounds = { x: elemRect.left, y: offset };
  };
  _onResize = () => raf(this.recalculateBounds);
  _onTouchStart = (e) => {
    if (e)
      e.preventDefault();
    raf(this.recalculateBounds);
    this.setInitialState();
    this.forceRender();
    this._emitPatternStart();
    this._isDragging = true;
  };
  _onTouchStop = (e) => {
    if (e)
      e.preventDefault();
    this.coordinates = null;
    this.renderLoop(false);
    this._emitPatternComplete();
    this._isDragging = false;
  };
  _onTouchMove = (e) => {
    if (e)
      e.preventDefault();
    if (this._isDragging) {
      let mousePoint = {
        x: prop("pageX", e) || prop("touches.0.pageX", e) || 0,
        y: prop("pageY", e) || prop("touches.0.pageY", e) || 0
      };
      mousePoint = {
        x: mousePoint.x - this.bounds.x,
        y: mousePoint.y - this.bounds.y
      };
      if (this.isPointInCanvas(mousePoint)) {
        this.coordinates = mousePoint;
      } else {
        this._onTouchStop();
      }
    }
  };
  // Checks if given point is within the boundaries of the canvas
  // isPointInCanvas :: Point -> Boolean
  isPointInCanvas = ({ x, y }) => x <= this.dimens.width && x > 0 && y <= this.dimens.height && y > 0;
  // Check if the given node is already selected
  // isSelected :: Node -> Boolean
  isSelected = (targetNode) => !!this.selectedNodes.filter((node) => node.row === targetNode.row && node.col === targetNode.col).length;
  // Adds intermediary nodes between lastSelectedNode and the target
  // addIntermediaryNodes :: Node -> ()
  addIntermediaryNodes(target) {
    const stepNode = this.getIntermediaryStepDirection(this.lastSelectedNode, target);
    if (stepNode.row !== 0 || stepNode.col !== 0) {
      let current = {
        row: this.lastSelectedNode.row + stepNode.row,
        col: this.lastSelectedNode.col + stepNode.col
      };
      const max = Math.max(this.rows, this.cols);
      let i = 0;
      while (i++ < max && (current.row !== target.row || current.col !== target.col)) {
        if (!this.isSelected(current)) {
          this.selectedNodes.push(current);
        }
        current = {
          row: current.row + stepNode.row,
          col: current.col + stepNode.col
        };
      }
    }
    this.lastSelectedNode = target;
  }
  // Returns the step direction to select intermediary nodes
  // INFO: Can be moved out of the class as it is independent of `this`
  // getIntermediaryStepDirection :: (Node, Node) -> Node
  getIntermediaryStepDirection(prev, next) {
    let finalStep = { row: 0, col: 0 };
    if (!prev) {
      return finalStep;
    }
    const dRow = Math.abs(prev.row - next.row);
    const dCol = Math.abs(prev.col - next.col);
    if (dRow === 1 || dCol === 1) {
      return finalStep;
    }
    let dRsign = prev.row - next.row < 0 ? 1 : -1;
    let dCsign = prev.col - next.col < 0 ? 1 : -1;
    if (dRow === 0) {
      if (dCol !== 0) {
        finalStep.col = dCsign;
      }
    } else if (dCol === 0) {
      finalStep.row = dRsign;
    } else {
      const max = Math.max(dRow, dCol);
      const min = Math.min(dRow, dCol);
      const gcdValue = gcd(max, min);
      if (max % min === 0) {
        finalStep.col = dCol / gcdValue * dCsign;
        finalStep.row = dRow / gcdValue * dRsign;
      }
    }
    return finalStep;
  }
  // Calculate the state of the lock for the next frame
  calculationLoop = (runLoop = true) => {
    if (this._isDragging && this.coordinates) {
      this.forEachNode((x, y) => {
        const dist = Math.sqrt(
          Math.pow(this.coordinates.x - x, 2) + Math.pow(this.coordinates.y - y, 2)
        );
        if (dist < this.themeState.dimens.node_radius + 1) {
          const row = x / this.interval.x;
          const col = y / this.interval.y;
          const currentNode = { row, col };
          if (!this.isSelected(currentNode)) {
            this.addIntermediaryNodes(currentNode);
            this.selectedNodes.push(currentNode);
            return false;
          }
        }
      });
    }
    if (runLoop) {
      raf(this.calculationLoop);
    }
  };
  // Render the state of the lock
  renderLoop = (runLoop = true) => {
    if (this._isDragging) {
      const {
        colors: { accent, primary },
        dimens: { node_ring: ringWidth }
      } = this.themeState;
      this.ctx.clearRect(0, 0, this.dimens.width, this.dimens.height);
      this.renderGrid();
      const lastNode = this.selectedNodes.reduce((prevNode, node) => {
        if (prevNode) {
          const p1 = { x: node.row * this.interval.x, y: node.col * this.interval.y };
          const p2 = { x: prevNode.row * this.interval.x, y: prevNode.col * this.interval.y };
          this.drawNode(p1.x, p1.y, accent, primary, ringWidth + 3);
          this.drawNode(p2.x, p2.y, accent, primary, ringWidth + 3);
          this.joinNodes(prevNode.row, prevNode.col, node.row, node.col);
        }
        return node;
      }, null);
      if (lastNode && this.coordinates) {
        const prevPoint = { x: lastNode.row * this.interval.x, y: lastNode.col * this.interval.y };
        this.drawNode(prevPoint.x, prevPoint.y, accent, primary, ringWidth + 6);
        this.joinNodes(prevPoint.x, prevPoint.y, this.coordinates.x, this.coordinates.y, true);
      }
    }
    if (runLoop) {
      raf(this.renderLoop);
    }
  };
  // Render the grid to the canvas
  renderGrid() {
    this.ctx.fillStyle = this.themeState.colors.bg;
    this.ctx.fillRect(0, 0, this.dimens.width, this.dimens.height);
    this.interval = {
      x: this.dimens.width / (this.rows + 1),
      y: this.dimens.height / (this.cols + 1)
    };
    this.forEachNode(this.drawNode.bind(this));
  }
  // forEachNode :: ((x, y) -> Boolean) -> ()
  forEachNode(callback) {
    const xGrid = Array(this.rows + 1).fill(this.interval.x);
    const yGrid = Array(this.cols + 1).fill(this.interval.y);
    const breakException = new Error("Break Exception");
    try {
      yGrid.reduce((y, dy) => {
        xGrid.reduce((x, dx) => {
          if (callback(x, y) === false)
            throw breakException;
          return x + dx;
        });
        return y + dy;
      });
    } catch (e) {
      if (e !== breakException)
        throw e;
    }
  }
  drawNode(x, y, centerColor, borderColor, size) {
    const {
      dimens: { node_ring: ringWidth, node_radius: ringRadius, node_core: coreRadius },
      colors: { primary }
    } = this.themeState;
    this.ctx.lineWidth = size || ringWidth;
    this.ctx.fillStyle = centerColor || primary;
    this.ctx.strokeStyle = borderColor || primary;
    this.ctx.beginPath();
    this.ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
    this.ctx.stroke();
  }
  joinNodes(row1, col1, row2, col2, isCoordinates = false) {
    let factor = this.interval;
    if (isCoordinates) {
      factor = { x: 1, y: 1 };
    }
    const point1 = { x: factor.x * row1, y: factor.y * col1 };
    const point2 = { x: factor.x * row2, y: factor.y * col2 };
    this.ctx.lineWidth = this.themeState.dimens.line_width;
    this.ctx.strokeStyle = this.themeState.colors.accent;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(point1.x, point1.y);
    this.ctx.lineTo(point2.x, point2.y);
    this.ctx.stroke();
  }
  // Will check if the drawn pattern matches produces a hash from the passed list
  // matchHash :: Array<Hash> -> Matcher
  matchHash = (values) => {
    const matcher = Matcher_default(values, this.eventBus);
    this.onComplete((data) => matcher.check(data.hash));
    return matcher;
  };
};
var PatternLock_default = (...args) => new PatternLock(...args);

// src/example-helpers/PatternLockCanvas.js
var PatternLockCanvas = component({
  locker: Maybe(null),
  defaultProps: { onComplete: () => {
  } },
  onCreate: (self, { onComplete, ...props }) => ($canvas) => {
    const lock = PatternLock_default({ $canvas, ...props });
    lock.onComplete(onComplete);
    self.locker = Maybe(lock);
  },
  onDestroy: (self) => () => self.locker.map((lock) => lock.destroy()),
  onReceiveProps: (self, props, prevProps) => {
    if (isEqual(props, prevProps))
      return;
    self.locker.map((lock) => {
      return lock.setGrid(...props.grid, false).setTheme(props.theme, false).setThemeState(props.themeState, false).forceRender();
    });
  },
  render: ({ rootProps }) => h("canvas", rootProps)
});
var PatternLockCanvas_default = PatternLockCanvas;

// src/vanilla.example.js
var App = component({
  state: {
    gridIndex: 1,
    themeIndex: 0,
    themeStateIndex: 0,
    password: "",
    showControls: true,
    width: 300,
    height: 430
  },
  actions: {
    setGrid: (gridIndex) => () => ({ gridIndex }),
    setTheme: (themeIndex) => () => ({ themeIndex }),
    setThemeState: (themeStateIndex) => () => ({ themeStateIndex }),
    setPassword: (password) => () => ({ password }),
    setDimensions: (dimens) => () => {
      return dimens;
    },
    toggleControls: () => ({ showControls }) => ({ showControls: !showControls })
  },
  render: ({ grids, themes: themes2, themeStates }) => (state, actions) => h("div", {}, [
    h("div", { class: "title" }, "PatternLockJS"),
    h("div", { class: "subtitle" }, "Draw unlock pattern to generate a hash"),
    h(
      "div",
      { class: "canvas-wrapper" },
      h(PatternLockCanvas_default, {
        width: state.width,
        height: state.height,
        onComplete: ({ hash }) => actions.setPassword(hash),
        grid: grids[state.gridIndex],
        theme: themes2[state.themeIndex],
        themeState: themeStates[state.themeStateIndex]
      })
    ),
    h("div", { class: "password" }, [
      "Generated hash: ",
      h("input", { value: state.password })
    ]),
    h("button", {
      onclick: actions.toggleControls,
      class: "button-primary"
    }, `${state.showControls ? "Hide" : "Show"} Controls`),
    !state.showControls ? null : h("div", { class: "controls-wrapper" }, [
      h(CodeExample_default, {
        config: {
          width: state.width,
          height: state.height,
          grid: grids[state.gridIndex],
          theme: themes2[state.themeIndex]
        }
      }),
      h("div", { style: { padding: "1em .3em" } }, [
        h(OptionsGroup, {
          name: "Grid",
          list: grids,
          selected: state.gridIndex,
          onItemSelect: (index) => () => actions.setGrid(index)
        }),
        h(OptionsGroup, {
          name: "Theme",
          list: themes2,
          selected: state.themeIndex,
          onItemSelect: (index) => () => actions.setTheme(index)
        }),
        h(OptionsGroup, {
          name: "Theme State",
          list: themeStates,
          selected: state.themeStateIndex,
          onItemSelect: (index) => () => actions.setThemeState(index)
        })
      ])
    ]),
    h("div", { style: { padding: "5em" } })
  ])
});
document.addEventListener("DOMContentLoaded", () => {
  const { state, actions } = App.instance;
  const view = h(App, {
    grids: [[2, 2], [3, 3], [3, 4], [4, 4], [4, 5]],
    themes: ["dark", "light"],
    themeStates: ["default", "success", "failure"]
  });
  app(state, actions, view, document.getElementById("root"));
});
/*! Bundled license information:

clipboard/dist/clipboard.js:
  (*!
   * clipboard.js v2.0.1
   * https://zenorocha.github.io/clipboard.js
   * 
   * Licensed MIT © Zeno Rocha
   *)
*/
