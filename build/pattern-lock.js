(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['patten-lock'] = factory());
}(this, (function () { 'use strict';

	var wordMap = [['lorem', 'ipsum', 'dolor', 'sit', 'amet'], ['fo^$*@!#x', 'jum[.,]ps', 'ov#$^er', 'bri;24dge', 'dea=-=th'], ['fancy', 'planes', 'foolish', 'man', 'juice'], ['nunc', 'vehicula', 'lectus', 'fermentum', 'suscipit'], ['adipiscing', 'erat', 'porta', 'lobortis', 'ullamcorper']];

	/**
	 * Convert pattern to a string of random words
	 * 
	 * @param {Array<{ row: Number, col: Number }>} nodes
	 * 
	 * @returns {String}
	 */
	var patternToWords = function patternToWords(nodes) {
	  return nodes.reduce(function () {
	    var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var node = arguments[1];
	    return wordMap[node.row - 1][node.col - 1] + string;
	  });
	};

	/**
	 * Hashcode algorithm implementation
	 * 
	 * @param {String} str
	 * 
	 * @returns {String}
	 */
	var hashCode = function hashCode(str) {
	  if (!str.length) return '';

	  var hash = str.split('').reduce(function () {
	    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var b = arguments[1];

	    a = (a << 5) - a + b.charCodeAt(0);
	    return a & a;
	  });

	  return btoa(hash + '');
	};

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PatternLock = function () {
		function PatternLock(config) {
			_classCallCheck(this, PatternLock);

			this.$canvas = document.querySelector(config.el);
			this.dimens = Object.assign({}, config.dimens);

			this.$canvas.width = this.dimens.width;
			this.$canvas.height = this.dimens.height;

			// Canvas context
			this.ctx = this.$canvas.getContext('2d');

			// Canvas position and dimens
			this.bounds = this.$canvas.getBoundingClientRect();

			// Default themes
			this.THEME = {
				accent: '#1abc9c',
				primary: '#ffffff',
				bg: '#2c3e50',
				dimens: {
					line_width: 6,
					node_radius: 28,
					node_core: 8,
					node_ring: 1
				}
			};

			this.setInitialState();
		}

		_createClass(PatternLock, [{
			key: 'setTheme',


			/**
	   * Set the pattern lock screen theme
	   *
	   * @param {Object}   theme    Theme to add to defaults
	   *
	   * @return {Object}           Full theme
	   */
			value: function setTheme(theme) {

				this.THEME.dimens = Object.assign({}, this.THEME.dimens, theme.dimens || {});
				theme.dimens = this.THEME.dimens;
				this.THEME = Object.assign({}, this.THEME, theme);

				return this.THEME;
			}

			/**
	   * Attach event listeners and start frame loops
	   */

		}, {
			key: 'start',
			value: function start() {

				// Binding context
				this._mouseStartHandler = this._mouseStartHandler.bind(this);
				this._mouseEndHandler = this._mouseEndHandler.bind(this);
				this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
				this.renderLoop = this.renderLoop.bind(this);
				this.calculationLoop = this.calculationLoop.bind(this);

				// Attach event handlers
				this.$canvas.addEventListener('mousedown', this._mouseStartHandler);
				this.$canvas.addEventListener('mouseup', this._mouseEndHandler);
				window.addEventListener('mousemove', this._mouseMoveHandler);
				this.$canvas.addEventListener('touchstart', this._mouseStartHandler);
				this.$canvas.addEventListener('touchend', this._mouseEndHandler);
				window.addEventListener('touchmove', this._mouseMoveHandler);

				// Start frame loops
				requestAnimationFrame(this.renderLoop);
				requestAnimationFrame(this.calculationLoop);
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

			/**
	   * Mouse start handler
	   */

		}, {
			key: '_mouseStartHandler',
			value: function _mouseStartHandler(e) {
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
			key: '_mouseEndHandler',
			value: function _mouseEndHandler(e) {
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
			key: '_mouseMoveHandler',
			value: function _mouseMoveHandler(e) {

				e.preventDefault();

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
						this._mouseEndHandler();
					}
				}
			}

			/**
	   * Check if the given node is already selected
	   *
	   * @param  {Object}  targetNode  Node to check
	   *
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
	   * Returns the greatest common divisor of two numbers
	   */

		}, {
			key: 'gcd',
			value: function gcd(x, y) {
				while (y != 0) {
					var tmp = x;
					x = y;
					y = tmp % y;
				}
				return x;
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
					var gcd = this.gcd(max, min);
					if (max % min === 0) {
						finalStep.col = dCol / gcd * dCsign;
						finalStep.row = dRow / gcd * dRsign;
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
					requestAnimationFrame(this.calculationLoop);
				}
			}

			/**
	   * Render the state of the lock
	   *
	   * @param  {Boolean} runLoop  Start it as a loop if true
	   */

		}, {
			key: 'renderLoop',
			value: function renderLoop() {
				var _this2 = this;

				var runLoop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


				if (this._isDragging) {

					// Clear the canvas(Redundant)
					this.ctx.clearRect(0, 0, this.dimens.width, this.dimens.height);

					this.renderGrid();

					// Plot all the selected nodes
					var lastNode = this.selectedNodes.reduce(function (prevNode, node) {

						if (prevNode) {

							var point1 = { x: node.row * _this2.interval.x, y: node.col * _this2.interval.y };
							var point2 = { x: prevNode.row * _this2.interval.x, y: prevNode.col * _this2.interval.y };

							// Make the two selected nodes bigger
							_this2.drawNode(point1.x, point1.y, _this2.THEME.accent, _this2.THEME.primary, _this2.THEME.dimens.node_ring + 3);
							_this2.drawNode(point2.x, point2.y, _this2.THEME.accent, _this2.THEME.primary, _this2.THEME.dimens.node_ring + 3);

							// Join the nodes
							_this2.joinNodes(prevNode.row, prevNode.col, node.row, node.col);
						}

						return node;
					}, null);

					if (lastNode && this.coordinates) {

						// Draw the last node
						this.drawNode(lastNode.row * this.interval.x, lastNode.col * this.interval.y, this.THEME.accent, this.THEME.primary, this.THEME.dimens.node_ring + 6);

						// Draw a line between last node to the current drag position
						this.joinNodes(lastNode.row * this.interval.x, lastNode.col * this.interval.y, this.coordinates.x, this.coordinates.y, true // IsCoordinates instead of row and column position
						);
					}
				}

				if (runLoop) {
					requestAnimationFrame(this.renderLoop);
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

				this.ctx.fillStyle = this.THEME.bg;
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
				var _this3 = this;

				var xGrid = Array(this.rows).fill(this.interval.x);
				var yGrid = Array(this.cols).fill(this.interval.y);

				var breakException = new Error('Break Exception');

				try {

					yGrid.reduce(function (y, dy) {

						xGrid.reduce(function (x, dx) {

							// If the callback returns false, break out of the loop
							if (callback(x, y) === false) throw breakException;

							return x + dx;
						}, _this3.interval.x);

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
				var centerColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.THEME.primary;
				var borderColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.THEME.primary;
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
				this.ctx.strokeStyle = this.THEME.accent;
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


	PatternLock.patternToWords = patternToWords;
	PatternLock.hashCode = hashCode;

	return PatternLock;

})));
