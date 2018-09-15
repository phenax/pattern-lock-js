"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PatternLock = void 0;

var _EventBus = _interopRequireDefault(require("./utils/EventBus"));

var _Matcher = _interopRequireDefault(require("./utils/Matcher"));

var _libs = require("./utils/libs");

var _dom = require("./utils/dom");

var _themes = _interopRequireDefault(require("./utils/themes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
type Hash = String
type Pixels = Number
type String = String
type Grid = [ Number, Number ]
type Theme = String | Object

type Node = { row :: Number, col :: Number }
type Point = { x :: Number, y :: Number }

type State = 'default' | 'success' | 'failure'

type Colors = {
	bg :: String
	accent :: String
	primary :: String
}

type Dimens = {
	line_width :: Pixels
	node_radius :: Pixels
	node_core :: Pixels
	node_ring :: Pixels
}

type Styles = {
	colors :: Colors
	dimens :: Dimens
}

type Options = {
	$canvas :: HTMLCanvasElement
	theme :: ?Theme
	grid :: ?Grid
	width :: ?Pixels
	height :: ?Pixels
}

*/
var createInvalidOptionError = function createInvalidOptionError(option) {
  return new Error("Invalid or empty ".concat(option, " passed"));
};

var DEFAULT_THEME_NAME = 'dark';
var events = {
  PATTERN_COMPLETE: 'complete',
  PATTERN_START: 'start'
};
var defaultConfig = {
  theme: DEFAULT_THEME_NAME,
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

    _defineProperty(this, "forceRender", function () {
      return (0, _dom.raf)(function () {
        var previousDragState = _this._isDragging;
        _this._isDragging = true;

        _this.calculationLoop(false);

        (0, _dom.raf)(function () {
          _this.renderLoop(false);

          _this._isDragging = previousDragState;
        });
      });
    });

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

    _defineProperty(this, "recalculateBounds", function () {
      return _this.bounds = {
        x: _this.$canvas.offsetLeft,
        y: _this.$canvas.offsetTop
      };
    });

    _defineProperty(this, "_onResize", function () {
      return (0, _dom.raf)(_this.recalculateBounds);
    });

    _defineProperty(this, "_onTouchStart", function (e) {
      if (e) e.preventDefault();

      _this.setInitialState();

      _this.forceRender();

      _this._emitPatternStart();

      _this._isDragging = true;
    });

    _defineProperty(this, "_onTouchStop", function (e) {
      if (e) e.preventDefault();
      _this.coordinates = null;

      _this.renderLoop(false);

      _this._emitPatternComplete();

      _this._isDragging = false;
    });

    _defineProperty(this, "_onTouchMove", function (e) {
      if (e) e.preventDefault();

      if (_this._isDragging) {
        var mousePoint = {
          x: e.pageX || e.touches[0].pageX,
          y: e.pageY || e.touches[0].pageY
        };
        mousePoint = {
          x: mousePoint.x - _this.bounds.x,
          y: mousePoint.y - _this.bounds.y
        };

        if (_this.isPointInCanvas(mousePoint)) {
          _this.coordinates = mousePoint;
        } else {
          _this._onTouchStop();
        }
      }
    });

    _defineProperty(this, "isPointInCanvas", function (_ref) {
      var x = _ref.x,
          y = _ref.y;
      return x <= _this.dimens.width && x > 0 && y <= _this.dimens.height && y > 0;
    });

    _defineProperty(this, "isSelected", function (targetNode) {
      return !!_this.selectedNodes.filter(function (node) {
        return node.row === targetNode.row && node.col === targetNode.col;
      }).length;
    });

    _defineProperty(this, "calculationLoop", function () {
      var runLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (_this._isDragging && _this.coordinates) {
        _this.forEachNode(function (x, y) {
          var dist = Math.sqrt(Math.pow(_this.coordinates.x - x, 2) + Math.pow(_this.coordinates.y - y, 2));

          if (dist < _this.themeState.dimens.node_radius + 1) {
            var row = x / _this.interval.x;
            var col = y / _this.interval.y;
            var currentNode = {
              row: row,
              col: col
            };

            if (!_this.isSelected(currentNode)) {
              _this.addIntermediaryNodes(currentNode);

              _this.selectedNodes.push(currentNode);

              return false;
            }
          }
        });
      }

      if (runLoop) {
        (0, _dom.raf)(_this.calculationLoop);
      }
    });

    _defineProperty(this, "renderLoop", function () {
      var runLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (_this._isDragging) {
        var _this$themeState = _this.themeState,
            _this$themeState$colo = _this$themeState.colors,
            accent = _this$themeState$colo.accent,
            primary = _this$themeState$colo.primary,
            ringWidth = _this$themeState.dimens.node_ring; // Clear the canvas(Redundant)

        _this.ctx.clearRect(0, 0, _this.dimens.width, _this.dimens.height); // Paint the grid


        _this.renderGrid(); // Plot all the selected nodes


        var lastNode = _this.selectedNodes.reduce(function (prevNode, node) {
          if (prevNode) {
            var p1 = {
              x: node.row * _this.interval.x,
              y: node.col * _this.interval.y
            };
            var p2 = {
              x: prevNode.row * _this.interval.x,
              y: prevNode.col * _this.interval.y
            }; // Make the two selected nodes bigger

            _this.drawNode(p1.x, p1.y, accent, primary, ringWidth + 3);

            _this.drawNode(p2.x, p2.y, accent, primary, ringWidth + 3); // Join the nodes


            _this.joinNodes(prevNode.row, prevNode.col, node.row, node.col);
          }

          return node;
        }, null);

        if (lastNode && _this.coordinates) {
          var prevPoint = {
            x: lastNode.row * _this.interval.x,
            y: lastNode.col * _this.interval.y
          }; // Draw the last node

          _this.drawNode(prevPoint.x, prevPoint.y, accent, primary, ringWidth + 6); // Draw a line between last node to the current drag position


          _this.joinNodes(prevPoint.x, prevPoint.y, _this.coordinates.x, _this.coordinates.y, true);
        }
      }

      if (runLoop) {
        (0, _dom.raf)(_this.renderLoop);
      }
    });

    _defineProperty(this, "matchHash", function (values) {
      var matcher = (0, _Matcher.default)(values, _this.eventBus);

      _this.onComplete(function (data) {
        return matcher.check(data.hash);
      });

      return matcher;
    });

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
    value: function initialize(_ref2) {
      var theme = _ref2.theme,
          _ref2$grid = _slicedToArray(_ref2.grid, 2),
          rows = _ref2$grid[0],
          cols = _ref2$grid[1];

      this._subscriptions = [];
      this.eventBus = (0, _EventBus.default)();
      this.setTheme(theme, false);
      this.setGrid(rows, cols);
      this.renderGrid();
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
    key: "setGrid",
    // setGrid :: (Number, Number) -> PatternLock
    value: function setGrid(rows, cols) {
      if (this.rows === rows && this.cols === cols) return this;
      this.rows = rows;
      this.cols = cols;
      this.setInitialState();

      this._onResize();

      this.forceRender();
      return this;
    } // setTheme :: (Theme, ?Boolean) -> PatternLock

  }, {
    key: "setTheme",
    value: function setTheme(theme) {
      var rerender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (theme === _themes.default[this.theme] || theme === this.theme) return this;
      if (typeof theme === 'string') theme = _themes.default[theme];
      if (!theme) throw createInvalidOptionError('theme');
      this.theme = theme;
      this.setThemeState('default', false);
      rerender && this.forceRender();
      return this;
    } // setThemeState :: (State, ?Boolean) -> PatternLock

  }, {
    key: "setThemeState",
    value: function setThemeState(themeState) {
      var rerender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this.theme) throw createInvalidOptionError('theme');
      this.themeState = this.theme[themeState || 'default'] || {};
      this.themeState.colors = _objectSpread({}, this.theme.default.colors, this.themeState.colors);
      this.themeState.dimens = _objectSpread({}, this.theme.default.dimens, this.themeState.dimens);
      rerender && this.forceRender();
      return this;
    } // Attach event listeners and start frame loops

  }, {
    key: "attachEventHandlers",
    value: function attachEventHandlers() {
      var _this2 = this;

      var register = function register(t, ev, fn) {
        return _this2._subscriptions.push((0, _dom.registerEvent)(t, ev, fn));
      };

      register(this.$canvas, 'mousedown touchstart', this._onTouchStart);
      register(this.$canvas, 'mouseup touchend', this._onTouchStop);
      register(window, 'mousemove touchmove', this._onTouchMove);
      register(window, 'resize', this._onResize); // Start frame loops

      (0, _dom.raf)(this.renderLoop);
      (0, _dom.raf)(this.calculationLoop);
    } // Event handler stuff start

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
      var nodes = this.selectedNodes;
      var password = (0, _libs.patternToWords)(nodes);
      var hash = (0, _libs.hashCode)(password);
      this.emit(events.PATTERN_COMPLETE, {
        nodes: nodes,
        hash: hash
      });
    } // Event handler stuff end
    // recalculateBounds :: () -> Point

  }, {
    key: "addIntermediaryNodes",
    // Adds intermediary nodes between lastSelectedNode and the target
    // addIntermediaryNodes :: Node -> ()
    value: function addIntermediaryNodes(target) {
      var stepNode = this.getIntermediaryStepDirection(this.lastSelectedNode, target);

      if (stepNode.row !== 0 || stepNode.col !== 0) {
        var current = {
          row: this.lastSelectedNode.row + stepNode.row,
          col: this.lastSelectedNode.col + stepNode.col
        };
        var max = Math.max(this.rows, this.cols);
        var i = 0;

        while (i++ < max && (current.row !== target.row || current.col !== target.col)) {
          this.selectedNodes.push(current);
          current = {
            row: current.row + stepNode.row,
            col: current.col + stepNode.col
          };
        }
      }

      this.lastSelectedNode = target;
    } // Returns the step direction to select intermediary nodes
    // INFO: Can be moved out of the class as it is independent of `this`
    // getIntermediaryStepDirection :: (Node, Node) -> Node

  }, {
    key: "getIntermediaryStepDirection",
    value: function getIntermediaryStepDirection(prev, next) {
      var finalStep = {
        row: 0,
        col: 0
      };

      if (!prev) {
        return finalStep;
      }

      var dRow = Math.abs(prev.row - next.row);
      var dCol = Math.abs(prev.col - next.col);

      if (dRow === 1 || dCol === 1) {
        return finalStep;
      }

      var dRsign = prev.row - next.row < 0 ? 1 : -1;
      var dCsign = prev.col - next.col < 0 ? 1 : -1;

      if (dRow === 0) {
        if (dCol !== 0) {
          finalStep.col = dCsign;
        }
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
    key: "renderGrid",
    // Render the grid to the canvas
    value: function renderGrid() {
      this.ctx.fillStyle = this.themeState.colors.bg;
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
      var xGrid = Array(this.rows + 1).fill(this.interval.x);
      var yGrid = Array(this.cols + 1).fill(this.interval.y);
      var breakException = new Error('Break Exception');

      try {
        yGrid.reduce(function (y, dy) {
          xGrid.reduce(function (x, dx) {
            if (callback(x, y) === false) throw breakException;
            return x + dx;
          });
          return y + dy;
        });
      } catch (e) {
        if (e !== breakException) throw e;
      }
    }
  }, {
    key: "drawNode",
    value: function drawNode(x, y, centerColor, borderColor, size) {
      var _this$themeState2 = this.themeState,
          _this$themeState2$dim = _this$themeState2.dimens,
          ringWidth = _this$themeState2$dim.node_ring,
          ringRadius = _this$themeState2$dim.node_radius,
          coreRadius = _this$themeState2$dim.node_core,
          primary = _this$themeState2.colors.primary; // Config

      this.ctx.lineWidth = size || ringWidth;
      this.ctx.fillStyle = centerColor || primary;
      this.ctx.strokeStyle = borderColor || primary; // Draw inner circle

      this.ctx.beginPath();
      this.ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
      this.ctx.fill(); // Draw outer ring

      this.ctx.beginPath();
      this.ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
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

      this.ctx.lineWidth = this.themeState.dimens.line_width;
      this.ctx.strokeStyle = this.themeState.colors.accent;
      this.ctx.lineCap = 'round'; // Draw line

      this.ctx.beginPath();
      this.ctx.moveTo(point1.x, point1.y);
      this.ctx.lineTo(point2.x, point2.y);
      this.ctx.stroke();
    } // Will check if the drawn pattern matches produces a hash from the passed list
    // matchHash :: Array<Hash> -> Matcher

  }]);

  return PatternLock;
}();

exports.PatternLock = PatternLock;

var _default = function _default() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _construct(PatternLock, args);
};

exports.default = _default;