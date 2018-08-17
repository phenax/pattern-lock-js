(function () {
	'use strict';

	var THEMES = {
		default: {
			colors: {
				accent: '#ae64cd',
				primary: '#ffffff',
				bg: '#2c3e50'
			},
			dimens: {
				line_width: 6,
				node_radius: 20,
				node_core: 8,
				node_ring: 1
			}
		},
		success: {
			colors: {
				accent: '#51e980'
			}
		}
	};

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var bind = function bind(target, events, fn) {
		return events.forEach(function (ev) {
			return target.addEventListener(ev, fn);
		});
	};

	var raf = requestAnimationFrame;

	var createInvalidOptionError = function createInvalidOptionError(option) {
		return new Error('Need to specify ' + option + ' option');
	};

	var defaultConfig = {
		theme: 'default',
		grid: [3, 3],
		width: 300,
		height: 430
	};

	var PatternLock = function () {
		function PatternLock(config) {
			_classCallCheck(this, PatternLock);

			if (!config.$canvas) throw createInvalidOptionError('$canvas');

			config = _extends({}, defaultConfig, config);

			this.$canvas = config.$canvas;
			this.dimens = { width: config.width, height: config.height };

			this.$canvas.width = this.dimens.width;
			this.$canvas.height = this.dimens.height;

			// Canvas context
			this.ctx = this.$canvas.getContext('2d');

			this._onTouchStart = this._onTouchStart.bind(this);
			this._onTouchStop = this._onTouchStop.bind(this);
			this._onTouchMove = this._onTouchMove.bind(this);
			this._onResize = this._onResize.bind(this);
			this.renderLoop = this.renderLoop.bind(this);
			this.calculationLoop = this.calculationLoop.bind(this);

			this.setTheme(config.theme);

			this._onResize();

			this.setInitialState();
			this.generateGrid.apply(this, _toConsumableArray(config.grid));

			this.attachEventHandlers();
		}

		/**
	  * Set the pattern lock screen theme
	  * @param {Object|string}   theme
	  * @return {Object}                  New theme
	  */


		_createClass(PatternLock, [{
			key: 'setTheme',
			value: function setTheme(theme) {

				var defaultTheme = THEMES.default;

				if (typeof theme === 'string') {
					theme = THEMES[theme];
				}

				this.THEME = this.THEME || {};
				this.THEME.colors = _extends({}, defaultTheme.colors, theme.colors);
				this.THEME.dimens = _extends({}, defaultTheme.dimens, theme.dimens);

				this.forceUpdate();

				return this.THEME;
			}

			/**
	   * Attach event listeners and start frame loops
	   */

		}, {
			key: 'attachEventHandlers',
			value: function attachEventHandlers() {
				bind(this.$canvas, ['mousedown', 'touchstart'], this._onTouchStart);
				bind(this.$canvas, ['mouseup', 'touchend'], this._onTouchStop);
				bind(window, ['mousemove', 'touchmove'], this._onTouchMove);
				bind(window, ['resize'], this._onResize);

				// Start frame loops
				raf(this.renderLoop);
				raf(this.calculationLoop);
			}

			/**
	   * Set the initial state
	   */

		}, {
			key: 'setInitialState',
			value: function setInitialState() {
				this.coordinates = null;
				this.selectedNodes = [];
				this.lastSelectedNode = null;
			}
		}, {
			key: '_onResize',
			value: function _onResize() {
				// Canvas position and dimens
				this.bounds = this.$canvas.getBoundingClientRect();
			}

			/**
	   * Mouse start handler
	   */

		}, {
			key: '_onTouchStart',
			value: function _onTouchStart(e) {
				if (e) e.preventDefault();

				this.setInitialState();
				this.calculationLoop(false);
				this.renderLoop(false);

				this._isDragging = true;
			}

			/**
	   * Mouse end handler
	   */

		}, {
			key: '_onTouchStop',
			value: function _onTouchStop(e) {
				if (e) e.preventDefault();

				this.coordinates = null;
				this.renderLoop(false);

				this._isDragging = false;

				if (typeof this._patternCompleteHandler === 'function') {
					this._patternCompleteHandler(this.selectedNodes.slice(0));
				}
			}

			/**
	   * Mouse move handler
	   */

		}, {
			key: '_onTouchMove',
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
			}

			/**
	   * Check if the given node is already selected
	   * @param  {Object}  targetNode  Node to check
	   * @return {Boolean}             True if the node is selected
	   */

		}, {
			key: 'isSelected',
			value: function isSelected(targetNode) {
				return !!this.selectedNodes.find(function (node) {
					return node.row == targetNode.row && node.col == targetNode.col;
				});
			}

			/**
	   * Adds intermediary nodes between lastSelectedNode to a targetNode
	   *
	   * @param  {Object}  targetNode  Node to select
	   */

		}, {
			key: 'addIntermediaryNodes',
			value: function addIntermediaryNodes(targetNode) {
				var stepNode = this.intermediaryNodesStep(targetNode);
				if (stepNode.row !== 0 || stepNode.col !== 0) {
					var currentNode = { row: this.lastSelectedNode.row + stepNode.row, col: this.lastSelectedNode.col + stepNode.col };
					var maxIterations = Math.max(this.rows, this.cols);
					var i = 0;
					while (i++ < maxIterations && (currentNode.row !== targetNode.row || currentNode.col !== targetNode.col)) {
						this.selectedNodes.push(currentNode);
						currentNode = { row: currentNode.row + stepNode.row, col: currentNode.col + stepNode.col };
					}
				}
				this.lastSelectedNode = targetNode;
			}

			/**
	   * Returns the steps to perform to select intermediary nodes between lastSelectedNode and a targetNode
	   *
	   * @param  {Object}  targetNode  Node to select
	   *
	   * @return {Object}             { row: stepForRows, col: StepForCols }
	   */

		}, {
			key: 'intermediaryNodesStep',
			value: function intermediaryNodesStep(targetNode) {
				var finalStep = { row: 0, col: 0 };
				if (!this.lastSelectedNode) {
					return finalStep;
				}

				var dRow = Math.abs(this.lastSelectedNode.row - targetNode.row);
				var dCol = Math.abs(this.lastSelectedNode.col - targetNode.col);

				if (dRow === 1 || dCol === 1) {
					return finalStep;
				}

				var dRsign = this.lastSelectedNode.row - targetNode.row < 0 ? 1 : -1;
				var dCsign = this.lastSelectedNode.col - targetNode.col < 0 ? 1 : -1;

				if (dRow === 0) {
					if (dCol !== 0) finalStep.col = dCsign;
				} else if (dCol === 0) {
					finalStep.row = dRsign;
				} else {
					var max = Math.max(dRow, dCol);
					var min = Math.min(dRow, dCol);
					var _gcd = this.gcd(max, min);
					if (max % min === 0) {
						finalStep.col = dCol / _gcd * dCsign;
						finalStep.row = dRow / _gcd * dRsign;
					}
				}
				return finalStep;
			}

			/**
	   * Calculate the state of the lock for the next frame
	   *
	   * @param  {Boolean} runLoop  Start it as a loop if true
	   */

		}, {
			key: 'calculationLoop',
			value: function calculationLoop() {
				var _this = this;

				var runLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


				if (this._isDragging && this.coordinates) {

					this.forEachNode(function (x, y) {

						var dist = Math.sqrt(Math.pow(_this.coordinates.x - x, 2) + Math.pow(_this.coordinates.y - y, 2));

						if (dist < _this.THEME.dimens.node_radius + 1) {

							var row = x / _this.interval.x;
							var col = y / _this.interval.y;

							var currentNode = { row: row, col: col };

							if (!_this.isSelected(currentNode)) {
								_this.addIntermediaryNodes(currentNode);
								_this.selectedNodes.push(currentNode);
								return false;
							}
						}
					});
				}

				if (runLoop) {
					raf(this.calculationLoop);
				}
			}
		}, {
			key: 'forceUpdate',
			value: function forceUpdate() {
				var _this2 = this;

				raf(function () {
					_this2._isDragging = true;
					_this2.calculationLoop(false);
					raf(function () {
						return _this2.renderLoop(false);
					});
					_this2._isDragging = false;
				});
			}

			/**
	   * Render the state of the lock
	   *
	   * @param  {Boolean} runLoop  Start it as a loop if true
	   */

		}, {
			key: 'renderLoop',
			value: function renderLoop() {
				var _this3 = this;

				var runLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


				if (this._isDragging) {
					var _THEME$colors = this.THEME.colors,
					    accent = _THEME$colors.accent,
					    primary = _THEME$colors.primary;

					// Clear the canvas(Redundant)

					this.ctx.clearRect(0, 0, this.dimens.width, this.dimens.height);

					this.renderGrid();

					// Plot all the selected nodes
					var lastNode = this.selectedNodes.reduce(function (prevNode, node) {
						if (prevNode) {

							var point1 = { x: node.row * _this3.interval.x, y: node.col * _this3.interval.y };
							var point2 = { x: prevNode.row * _this3.interval.x, y: prevNode.col * _this3.interval.y };

							// Make the two selected nodes bigger
							_this3.drawNode(point1.x, point1.y, accent, primary, _this3.THEME.dimens.node_ring + 3);
							_this3.drawNode(point2.x, point2.y, accent, primary, _this3.THEME.dimens.node_ring + 3);

							// Join the nodes
							_this3.joinNodes(prevNode.row, prevNode.col, node.row, node.col);
						}

						return node;
					}, null);

					if (lastNode && this.coordinates) {

						// Draw the last node
						this.drawNode(lastNode.row * this.interval.x, lastNode.col * this.interval.y, accent, primary, this.THEME.dimens.node_ring + 6);

						// Draw a line between last node to the current drag position
						this.joinNodes(lastNode.row * this.interval.x, lastNode.col * this.interval.y, this.coordinates.x, this.coordinates.y, true // IsCoordinates instead of row and column position
						);
					}
				}

				if (runLoop) {
					raf(this.renderLoop);
				}
			}

			/**
	   * Generate the grid of nodes
	   *
	   * @param  {Number} rows  The number of horizontal nodes
	   * @param  {Number} cols  The number of vertical nodes
	   */

		}, {
			key: 'generateGrid',
			value: function generateGrid(rows, cols) {

				this.rows = rows;
				this.cols = cols;

				this.renderGrid();
			}

			/**
	   * Render the grid to the canvas
	   */

		}, {
			key: 'renderGrid',
			value: function renderGrid() {

				this.ctx.fillStyle = this.THEME.colors.bg;
				this.ctx.fillRect(0, 0, this.dimens.width, this.dimens.height);

				this.interval = {
					x: this.dimens.width / (this.rows + 1),
					y: this.dimens.height / (this.cols + 1)
				};

				// Draw all the nodes
				this.forEachNode(this.drawNode.bind(this));
			}

			/**
	   * ForEach iterator for all nodes on the grid
	   *
	   * @param  {Function} callback
	   */

		}, {
			key: 'forEachNode',
			value: function forEachNode(callback) {
				var _this4 = this;

				var xGrid = Array(this.rows).fill(this.interval.x);
				var yGrid = Array(this.cols).fill(this.interval.y);

				var breakException = new Error('Break Exception');

				try {

					yGrid.reduce(function (y, dy) {

						xGrid.reduce(function (x, dx) {

							// If the callback returns false, break out of the loop
							if (callback(x, y) === false) throw breakException;

							return x + dx;
						}, _this4.interval.x);

						return y + dy;
					}, this.interval.y);
				} catch (e) {
					if (e !== breakException) throw e;
				}
			}

			/**
	   * Draw a node
	   *
	   * @param  {Number} x
	   * @param  {Number} y
	   * @param  {String} centerColor
	   * @param  {String} borderColor
	   * @param  {Number} size
	   */

		}, {
			key: 'drawNode',
			value: function drawNode(x, y) {
				var centerColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.THEME.colors.primary;
				var borderColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.THEME.colors.primary;
				var size = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.THEME.dimens.node_ring;


				// Config
				this.ctx.lineWidth = size;
				this.ctx.fillStyle = centerColor;
				this.ctx.strokeStyle = borderColor;

				// Draw inner circle
				this.ctx.beginPath();
				this.ctx.arc(x, y, this.THEME.dimens.node_core, 0, Math.PI * 2);
				this.ctx.fill();

				// Draw outer ring
				this.ctx.beginPath();
				this.ctx.arc(x, y, this.THEME.dimens.node_radius, 0, Math.PI * 2);
				this.ctx.stroke();
			}

			/**
	   * Join two nodes with a line
	   *
	   * @param  {Number}  row1
	   * @param  {Number}  col1
	   * @param  {Number}  row2
	   * @param  {Number}  col2
	   * @param  {Boolean} isCoordinates  If true, will calculate as pixels
	   */

		}, {
			key: 'joinNodes',
			value: function joinNodes(row1, col1, row2, col2) {
				var isCoordinates = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;


				var factor = this.interval;

				if (isCoordinates) {
					factor = { x: 1, y: 1 };
				}

				var point1 = { x: factor.x * row1, y: factor.y * col1 };
				var point2 = { x: factor.x * row2, y: factor.y * col2 };

				// Config
				this.ctx.lineWidth = this.THEME.dimens.line_width;
				this.ctx.strokeStyle = this.THEME.colors.accent;
				this.ctx.lineCap = 'round';

				// Draw line
				this.ctx.beginPath();
				this.ctx.moveTo(point1.x, point1.y);
				this.ctx.lineTo(point2.x, point2.y);
				this.ctx.stroke();
			}
		}, {
			key: 'onPatternComplete',
			set: function set(cb) {
				this._patternCompleteHandler = cb;
			}
		}]);

		return PatternLock;
	}();

	var PatternLock$1 = (function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return new (Function.prototype.bind.apply(PatternLock, [null].concat(args)))();
	});

	document.addEventListener('DOMContentLoaded', function () {

		var lock = PatternLock$1({
			$canvas: document.querySelector('#patternLock'),
			width: 300,
			height: 430,
			grid: [3, 3]
		});

		window.lock = lock;

		// lock.matchHash('somepasshash')
		// 	.onSuccess(() => lock.setTheme('success'))
		// 	.onFailure(() => lock.setTheme('failure'));

		// const $password = document.querySelector('.js-password');
		// lock.on('complete', ({ nodes, hash, password }) => {
		// 	$password.value = hash;
		// });
	});

}());
