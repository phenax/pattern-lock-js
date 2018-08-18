"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PatternLock = void 0;

var _events = _interopRequireDefault(require("./utils/events"));

var _libs = require("./utils/libs");

var _dom = require("./utils/dom");

var _Matcher = _interopRequireDefault(require("./utils/Matcher"));

var _themes = _interopRequireDefault(require("./utils/themes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// type Theme = String | Object
// type Node = { row :: Number, col :: Number }
var createInvalidOptionError = function createInvalidOptionError(option) {
  return new Error("Invalid or empty ".concat(option, " passed"));
};

var events = {
  PATTERN_COMPLETE: 'complete',
  PATTERN_START: 'start'
};
var defaultConfig = {
  theme: 'default',
  grid: [3, 3],
  width: 300,
  height: 430
};

var PatternLock =
/*#__PURE__*/
function () {
  function PatternLock(config) {
    var _this = this;

    _classCallCheck(this, PatternLock);

    _defineProperty(this, "destroy", function () {
      return _this._subscriptions.map(function (fn) {
        return fn();
      });
    });

    _defineProperty(this, "emit", function () {
      var _this$eventBus;

      return (_this$eventBus = _this.eventBus).emit.apply(_this$eventBus, arguments);
    });

    _defineProperty(this, "onStart", function (fn) {
      return _this.on(events.PATTERN_START, fn);
    });

    _defineProperty(this, "onComplete", function (fn) {
      return _this.on(events.PATTERN_COMPLETE, fn);
    });

    _defineProperty(this, "_emitPatternStart", function () {
      return _this.emit(events.PATTERN_START, {});
    });

    _defineProperty(this, "isSelected", function (targetNode) {
      return !!_this.selectedNodes.filter(function (node) {
        return node.row == targetNode.row && node.col == targetNode.col;
      }).length;
    });

    _defineProperty(this, "_match", function (type) {
      return function () {
        for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }

        var matcher = (0, _Matcher.default)(values);

        _this.onComplete(function (data) {
          return matcher.check(data[type]);
        });

        return matcher;
      };
    });

    _defineProperty(this, "matchHash", this._match('hash'));

    _defineProperty(this, "matchPassword", this._match('password'));

    if (!config.$canvas) throw createInvalidOptionError('$canvas');
    if (!config.width) throw createInvalidOptionError('width');
    if (!config.height) throw createInvalidOptionError('height');
    config = _objectSpread({}, defaultConfig, config);
    this.dimens = {
      width: config.width,
      height: config.height
    };
    this.setUpCanvas(config);
    this.initialize(config);
  }

  _createClass(PatternLock, [{
    key: "setUpCanvas",
    value: function setUpCanvas(config) {
      this.$canvas = config.$canvas;
      this.ctx = this.$canvas.getContext('2d');
      var ratio = (0, _dom.getPixelRatio)(this.ctx);
      this.$canvas.width = this.dimens.width * ratio;
      this.$canvas.height = this.dimens.height * ratio;
      this.$canvas.style.width = this.dimens.width + 'px';
      this.$canvas.style.height = this.dimens.height + 'px';
      this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  }, {
    key: "initialize",
    value: function initialize(config) {
      (0, _libs.bindContext)(this, ['_onTouchStart', '_onTouchStop', '_onTouchMove', '_onResize', 'renderLoop', 'calculationLoop']);
      this._subscriptions = [];
      this.eventBus = (0, _events.default)();
      this.setInitialState();

      this._onResize();

      this.setTheme(config.theme);
      this.generateGrid.apply(this, _toConsumableArray(config.grid));
      this.attachEventHandlers();
    }
  }, {
    key: "setInitialState",
    value: function setInitialState() {
      this.coordinates = null;
      this.selectedNodes = [];
      this.lastSelectedNode = null;
    }
  }, {
    key: "forceRender",
    value: function forceRender() {
      var _this2 = this;

      (0, _dom.raf)(function () {
        var previousDragState = _this2._isDragging;
        _this2._isDragging = true;

        _this2.calculationLoop(false);

        (0, _dom.raf)(function () {
          _this2.renderLoop(false);

          _this2._isDragging = previousDragState;
        });
      });
    } // setTheme :: (Theme, Boolean) -> Theme

  }, {
    key: "setTheme",
    value: function setTheme(theme) {
      var rerender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var defaultTheme = _themes.default.default;

      if (typeof theme === 'string') {
        theme = _themes.default[theme];
      }

      if (!theme) throw createInvalidOptionError("theme");
      this.THEME = this.THEME || {};
      this.THEME.colors = _objectSpread({}, defaultTheme.colors, theme.colors);
      this.THEME.dimens = _objectSpread({}, defaultTheme.dimens, theme.dimens);
      rerender && this.forceRender();
      return this.THEME;
    }
    /**
     * Attach event listeners and start frame loops
     */

  }, {
    key: "attachEventHandlers",
    value: function attachEventHandlers() {
      var _this3 = this;

      var register = function register(t, ev, fn) {
        return _this3._subscriptions.push((0, _dom.registerEvent)(t, ev, fn));
      };

      register(this.$canvas, 'mousedown touchstart', this._onTouchStart);
      register(this.$canvas, 'mouseup touchend', this._onTouchStop);
      register(window, 'mousemove touchmove', this._onTouchMove);
      register(window, 'resize', this._onResize); // Start frame loops

      (0, _dom.raf)(this.renderLoop);
      (0, _dom.raf)(this.calculationLoop);
    }
  }, {
    key: "on",
    value: function on(event, fn) {
      var subscription = this.eventBus.on(event, fn);

      this._subscriptions.push(subscription);

      return subscription;
    }
  }, {
    key: "_emitPatternComplete",
    value: function _emitPatternComplete() {
      var nodes = this.selectedNodes.slice(0);
      var password = (0, _libs.patternToWords)(nodes);
      var hash = (0, _libs.hashCode)(password);
      this.emit(events.PATTERN_COMPLETE, {
        nodes: nodes,
        hash: hash,
        password: password
      });
    }
  }, {
    key: "_onResize",
    value: function _onResize() {
      this.bounds = this.$canvas.getBoundingClientRect();
    }
  }, {
    key: "_onTouchStart",
    value: function _onTouchStart(e) {
      if (e) e.preventDefault();
      this.setInitialState();
      this.forceRender();

      this._emitPatternStart();

      this._isDragging = true;
    }
  }, {
    key: "_onTouchStop",
    value: function _onTouchStop(e) {
      if (e) e.preventDefault();
      this.coordinates = null;
      this.renderLoop(false);

      this._emitPatternComplete();

      this._isDragging = false;
    }
  }, {
    key: "_onTouchMove",
    value: function _onTouchMove(e) {
      if (e) e.preventDefault();

      if (this._isDragging) {
        var mousePoint = {
          x: e.pageX || e.touches[0].pageX,
          y: e.pageY || e.touches[0].pageY
        };
        mousePoint.x -= this.bounds.left;
        mousePoint.y -= this.bounds.top;

        if (mousePoint.x <= this.dimens.width && mousePoint.x > 0 && mousePoint.y <= this.dimens.height && mousePoint.y > 0) {
          this.coordinates = mousePoint;
        } else {
          this._onTouchStop();
        }
      }
    } // Check if the given node is already selected
    // isSelected :: Node -> Boolean

  }, {
    key: "addIntermediaryNodes",
    // Adds intermediary nodes between lastSelectedNode and the targetNode
    // addIntermediaryNodes :: Node -> ()
    value: function addIntermediaryNodes(targetNode) {
      var stepNode = this.getIntermediaryStepDirection(this.lastSelectedNode, targetNode);

      if (stepNode.row !== 0 || stepNode.col !== 0) {
        var currentNode = {
          row: this.lastSelectedNode.row + stepNode.row,
          col: this.lastSelectedNode.col + stepNode.col
        };
        var maxIterations = Math.max(this.rows, this.cols);
        var i = 0;

        while (i++ < maxIterations && (currentNode.row !== targetNode.row || currentNode.col !== targetNode.col)) {
          this.selectedNodes.push(currentNode);
          currentNode = {
            row: currentNode.row + stepNode.row,
            col: currentNode.col + stepNode.col
          };
        }
      }

      this.lastSelectedNode = targetNode;
    } // Returns the step direction to select intermediary nodes
    // INFO: Can be moved out of the class as it is independent of this
    // getIntermediaryStepDirection :: (Node, Node) -> Node

  }, {
    key: "getIntermediaryStepDirection",
    value: function getIntermediaryStepDirection(previousNode, nextNode) {
      var finalStep = {
        row: 0,
        col: 0
      };

      if (!previousNode) {
        return finalStep;
      }

      var dRow = Math.abs(previousNode.row - nextNode.row);
      var dCol = Math.abs(previousNode.col - nextNode.col);

      if (dRow === 1 || dCol === 1) {
        return finalStep;
      }

      var dRsign = previousNode.row - nextNode.row < 0 ? 1 : -1;
      var dCsign = previousNode.col - nextNode.col < 0 ? 1 : -1;

      if (dRow === 0) {
        if (dCol !== 0) finalStep.col = dCsign;
      } else if (dCol === 0) {
        finalStep.row = dRsign;
      } else {
        var max = Math.max(dRow, dCol);
        var min = Math.min(dRow, dCol);
        var gcdValue = (0, _libs.gcd)(max, min);

        if (max % min === 0) {
          finalStep.col = dCol / gcdValue * dCsign;
          finalStep.row = dRow / gcdValue * dRsign;
        }
      }

      return finalStep;
    } // Calculate the state of the lock for the next frame

  }, {
    key: "calculationLoop",
    value: function calculationLoop() {
      var _this4 = this;

      var runLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this._isDragging && this.coordinates) {
        this.forEachNode(function (x, y) {
          var dist = Math.sqrt(Math.pow(_this4.coordinates.x - x, 2) + Math.pow(_this4.coordinates.y - y, 2));

          if (dist < _this4.THEME.dimens.node_radius + 1) {
            var row = x / _this4.interval.x;
            var col = y / _this4.interval.y;
            var currentNode = {
              row: row,
              col: col
            };

            if (!_this4.isSelected(currentNode)) {
              _this4.addIntermediaryNodes(currentNode);

              _this4.selectedNodes.push(currentNode);

              return false;
            }
          }
        });
      }

      if (runLoop) {
        (0, _dom.raf)(this.calculationLoop);
      }
    } // Render the state of the lock

  }, {
    key: "renderLoop",
    value: function renderLoop() {
      var _this5 = this;

      var runLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this._isDragging) {
        var _this$THEME$colors = this.THEME.colors,
            accent = _this$THEME$colors.accent,
            primary = _this$THEME$colors.primary; // Clear the canvas(Redundant)

        this.ctx.clearRect(0, 0, this.dimens.width, this.dimens.height);
        this.renderGrid(); // Plot all the selected nodes

        var lastNode = this.selectedNodes.reduce(function (prevNode, node) {
          if (prevNode) {
            var point1 = {
              x: node.row * _this5.interval.x,
              y: node.col * _this5.interval.y
            };
            var point2 = {
              x: prevNode.row * _this5.interval.x,
              y: prevNode.col * _this5.interval.y
            }; // Make the two selected nodes bigger

            _this5.drawNode(point1.x, point1.y, accent, primary, _this5.THEME.dimens.node_ring + 3);

            _this5.drawNode(point2.x, point2.y, accent, primary, _this5.THEME.dimens.node_ring + 3); // Join the nodes


            _this5.joinNodes(prevNode.row, prevNode.col, node.row, node.col);
          }

          return node;
        }, null);

        if (lastNode && this.coordinates) {
          // Draw the last node
          this.drawNode(lastNode.row * this.interval.x, lastNode.col * this.interval.y, accent, primary, this.THEME.dimens.node_ring + 6); // Draw a line between last node to the current drag position

          this.joinNodes(lastNode.row * this.interval.x, lastNode.col * this.interval.y, this.coordinates.x, this.coordinates.y, true);
        }
      }

      if (runLoop) {
        (0, _dom.raf)(this.renderLoop);
      }
    }
    /**
     * Generate the grid of nodes
     *
     * @param  {Number} rows  The number of horizontal nodes
     * @param  {Number} cols  The number of vertical nodes
     */

  }, {
    key: "generateGrid",
    value: function generateGrid(rows, cols) {
      this.rows = rows;
      this.cols = cols;
      this.renderGrid();
    }
    /**
     * Render the grid to the canvas
     */

  }, {
    key: "renderGrid",
    value: function renderGrid() {
      this.ctx.fillStyle = this.THEME.colors.bg;
      this.ctx.fillRect(0, 0, this.dimens.width, this.dimens.height);
      this.interval = {
        x: this.dimens.width / (this.rows + 1),
        y: this.dimens.height / (this.cols + 1)
      }; // Draw all the nodes

      this.forEachNode(this.drawNode.bind(this));
    } // forEachNode :: ((x, y) -> Boolean) -> ()

  }, {
    key: "forEachNode",
    value: function forEachNode(callback) {
      var _this6 = this;

      var xGrid = Array(this.rows).fill(this.interval.x);
      var yGrid = Array(this.cols).fill(this.interval.y);
      var breakException = new Error('Break Exception');

      try {
        yGrid.reduce(function (y, dy) {
          xGrid.reduce(function (x, dx) {
            // If the callback returns false, break out of the loop
            if (callback(x, y) === false) throw breakException;
            return x + dx;
          }, _this6.interval.x);
          return y + dy;
        }, this.interval.y);
      } catch (e) {
        if (e !== breakException) throw e;
      }
    }
  }, {
    key: "drawNode",
    value: function drawNode(x, y, centerColor, borderColor, size) {
      // Config
      this.ctx.lineWidth = size || this.THEME.dimens.node_ring;
      this.ctx.fillStyle = centerColor || this.THEME.colors.primary;
      this.ctx.strokeStyle = borderColor || this.THEME.colors.primary; // Draw inner circle

      this.ctx.beginPath();
      this.ctx.arc(x, y, this.THEME.dimens.node_core, 0, Math.PI * 2);
      this.ctx.fill(); // Draw outer ring

      this.ctx.beginPath();
      this.ctx.arc(x, y, this.THEME.dimens.node_radius, 0, Math.PI * 2);
      this.ctx.stroke();
    }
  }, {
    key: "joinNodes",
    value: function joinNodes(row1, col1, row2, col2) {
      var isCoordinates = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var factor = this.interval;

      if (isCoordinates) {
        factor = {
          x: 1,
          y: 1
        };
      }

      var point1 = {
        x: factor.x * row1,
        y: factor.y * col1
      };
      var point2 = {
        x: factor.x * row2,
        y: factor.y * col2
      }; // Config

      this.ctx.lineWidth = this.THEME.dimens.line_width;
      this.ctx.strokeStyle = this.THEME.colors.accent;
      this.ctx.lineCap = 'round'; // Draw line

      this.ctx.beginPath();
      this.ctx.moveTo(point1.x, point1.y);
      this.ctx.lineTo(point2.x, point2.y);
      this.ctx.stroke();
    } // _match :: String -> (...any) -> Matcher

  }]);

  return PatternLock;
}();

exports.PatternLock = PatternLock;

var _default = function _default() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _construct(PatternLock, args);
};

exports.default = _default;