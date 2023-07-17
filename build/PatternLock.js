var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/PatternLock.js
var PatternLock_exports = {};
__export(PatternLock_exports, {
  PatternLock: () => PatternLock,
  default: () => PatternLock_default
});
module.exports = __toCommonJS(PatternLock_exports);

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
var prop = (path, obj) => path.split(".").reduce((acc, key) => acc ? acc[key] : void 0, obj);

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
  height: 430,
  showArrows: false
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
  initialize({ theme, grid: [rows, cols], showArrows }) {
    this._subscriptions = [];
    this.eventBus = EventBus_default();
    this.setTheme(theme, false);
    this.setGrid(rows, cols);
    this.renderGrid();
    this.attachEventHandlers();
    this.showArrows = showArrows;
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
  // setThemeState :: (Boolean, ?Boolean) -> PatternLock
  setShowArrow(showArrows, rerender = true) {
    this.showArrows = showArrows;
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
    const image = this.$canvas.toDataURL("image/png");
    this.emit(events.PATTERN_COMPLETE, { nodes, password, hash, image });
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
        if (!prevNode)
          return node;
        const p1 = { x: node.row * this.interval.x, y: node.col * this.interval.y };
        const p2 = { x: prevNode.row * this.interval.x, y: prevNode.col * this.interval.y };
        this.drawNode(p1.x, p1.y, accent, primary, ringWidth + 3);
        this.drawNode(p2.x, p2.y, accent, primary, ringWidth + 3);
        this.joinNodes(prevNode.row, prevNode.col, node.row, node.col, false);
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
  joinNodes(row1, col1, row2, col2, isCoordinates) {
    let factor = this.interval;
    if (isCoordinates) {
      factor = { x: 1, y: 1 };
    }
    const point1 = { x: factor.x * row1, y: factor.y * col1 };
    const point2 = { x: factor.x * row2, y: factor.y * col2 };
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = this.themeState.dimens.line_width;
    this.ctx.strokeStyle = this.themeState.colors.accent;
    this.ctx.beginPath();
    this.ctx.moveTo(point1.x, point1.y);
    this.ctx.lineTo(point2.x, point2.y);
    this.ctx.stroke();
    if (this.showArrows) {
      const mid = { x: (point2.x + point1.x) / 2, y: (point2.y + point1.y) / 2 };
      let angle = Math.atan((point2.y - point1.y) / (point2.x - point1.x));
      angle = point2.x < point1.x ? Math.PI + angle : angle;
      const segment = 8;
      this.ctx.lineWidth = this.themeState.dimens.line_width + 2;
      this.ctx.strokeStyle = `rgba(0, 0, 0, 0.1)`;
      this.ctx.beginPath();
      this.ctx.moveTo(mid.x - segment * Math.cos(angle - Math.PI / 4), mid.y - segment * Math.sin(angle - Math.PI / 4));
      this.ctx.lineTo(mid.x, mid.y);
      this.ctx.lineTo(mid.x - segment * Math.cos(angle + Math.PI / 4), mid.y - segment * Math.sin(angle + Math.PI / 4));
      this.ctx.stroke();
      this.ctx.lineWidth = this.themeState.dimens.line_width;
      this.ctx.strokeStyle = this.themeState.colors.accent;
      this.ctx.beginPath();
      this.ctx.moveTo(mid.x - segment * Math.cos(angle - Math.PI / 4), mid.y - segment * Math.sin(angle - Math.PI / 4));
      this.ctx.lineTo(mid.x, mid.y);
      this.ctx.lineTo(mid.x - segment * Math.cos(angle + Math.PI / 4), mid.y - segment * Math.sin(angle + Math.PI / 4));
      this.ctx.stroke();
    }
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
