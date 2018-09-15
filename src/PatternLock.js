import EventBus from './utils/EventBus';
import Matcher from './utils/Matcher';

import { patternToWords, hashCode, gcd } from './utils/libs';
import { registerEvent, getPixelRatio, raf } from './utils/dom';

import THEMES from './utils/themes';


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

const createInvalidOptionError = option => new Error(`Invalid or empty ${option} passed`);

const DEFAULT_THEME_NAME = 'dark';

const events = {
	PATTERN_COMPLETE: 'complete',
	PATTERN_START: 'start',
};

const defaultConfig = {
	theme: DEFAULT_THEME_NAME,
	grid: [ 3, 3 ],
	width: 300,
	height: 430,
};

export class PatternLock {

	constructor(config) {
		if(!config.$canvas) throw createInvalidOptionError('$canvas');
		if(!config.width) throw createInvalidOptionError('width');
		if(!config.height) throw createInvalidOptionError('height');

		config = { ...defaultConfig, ...config };
		this.dimens = { width: config.width, height: config.height };

		this.setUpCanvas(config);
		this.initialize(config);
	}

	setUpCanvas(config) {
		this.$canvas = config.$canvas;
		this.ctx = this.$canvas.getContext('2d');

		const ratio = getPixelRatio(this.ctx);

		this.$canvas.width = this.dimens.width * ratio;
		this.$canvas.height = this.dimens.height * ratio;
		this.$canvas.style.width = this.dimens.width + 'px';
		this.$canvas.style.height = this.dimens.height + 'px';
		this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
	}

	initialize({ theme, grid: [ rows, cols ] }) {
		this._subscriptions = [];
		this.eventBus = EventBus();

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
	setGrid(rows, cols) {
		if(this.rows === rows && this.cols === cols)
			return this;

		this.rows = rows;
		this.cols = cols;

		this.setInitialState();
		this._onResize();
		this.forceRender();
		return this;
	}

	// setTheme :: (Theme, ?Boolean) -> PatternLock
	setTheme(theme, rerender = true) {
		if (theme === THEMES[this.theme] || theme === this.theme)
			return this;

		if(typeof theme === 'string')
			theme = THEMES[theme];

		if(!theme) throw createInvalidOptionError('theme');

		this.theme = theme;

		this.setThemeState('default', false);

		rerender && this.forceRender();
		return this;
	}

	// setThemeState :: (State, ?Boolean) -> PatternLock
	setThemeState(themeState, rerender = true) {
		if(!this.theme) throw createInvalidOptionError('theme');

		this.themeState = this.theme[themeState || 'default'] || {};
		this.themeState.colors = { ...this.theme.default.colors, ...this.themeState.colors };
		this.themeState.dimens = { ...this.theme.default.dimens, ...this.themeState.dimens };

		rerender && this.forceRender();
		return this;
	}

	// Attach event listeners and start frame loops
	attachEventHandlers() {
		const register = (t, ev, fn) => this._subscriptions.push(registerEvent(t, ev, fn));

		register(this.$canvas, 'mousedown touchstart', this._onTouchStart);
		register(this.$canvas, 'mouseup touchend', this._onTouchStop);
		register(window, 'mousemove touchmove', this._onTouchMove);
		register(window, 'resize', this._onResize);

		// Start frame loops
		raf(this.renderLoop);
		raf(this.calculationLoop);
	}



	// Event handler stuff start
	destroy = () => this._subscriptions.map(fn => fn());

	on(event, fn) {
		const subscription = this.eventBus.on(event, fn);
		this._subscriptions.push(subscription);
		return subscription;
	}
	emit = (...args) => this.eventBus.emit(...args);
	onStart = fn => this.on(events.PATTERN_START, fn);
	onComplete = fn => this.on(events.PATTERN_COMPLETE, fn);

	_emitPatternStart = () => this.emit(events.PATTERN_START, {});
	_emitPatternComplete() {
		const nodes = this.selectedNodes;
		const password = patternToWords(nodes);
		const hash = hashCode(password);
		this.emit(events.PATTERN_COMPLETE, { nodes, hash });
	}
	// Event handler stuff end


	// recalculateBounds :: () -> Point
	recalculateBounds = () => this.bounds = ({
		x: this.$canvas.offsetLeft,
		y: this.$canvas.offsetTop,
	});

	_onResize = () => raf(this.recalculateBounds);

	_onTouchStart = e => {
		if (e) e.preventDefault();

		this.setInitialState();
		this.forceRender();

		this._emitPatternStart();
		this._isDragging = true;
	}

	_onTouchStop = e => {
		if (e) e.preventDefault();

		this.coordinates = null;
		this.renderLoop(false);

		this._emitPatternComplete();
		this._isDragging = false;
	}

	_onTouchMove = e => {
		if (e) e.preventDefault();

		if (this._isDragging) {

			let mousePoint = {
				x: e.pageX || e.touches[0].pageX,
				y: e.pageY || e.touches[0].pageY,
			};

			mousePoint = {
				x: mousePoint.x - this.bounds.x,
				y: mousePoint.y - this.bounds.y,
			};

			if (this.isPointInCanvas(mousePoint)) {
				this.coordinates = mousePoint;
			} else {
				this._onTouchStop();
			}
		}
	}

	// Checks if given point is within the boundaries of the canvas
	// isPointInCanvas :: Point -> Boolean
	isPointInCanvas = ({ x, y }) => (
		x <= this.dimens.width && x > 0 &&
		y <= this.dimens.height && y > 0
	);


	// Check if the given node is already selected
	// isSelected :: Node -> Boolean
	isSelected = targetNode => !!this.selectedNodes.filter(node => (
		node.row === targetNode.row &&
		node.col === targetNode.col
	)).length;

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
				this.selectedNodes.push(current);
				current = {
					row: current.row + stepNode.row,
					col: current.col + stepNode.col,
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

		let dRsign = (prev.row - next.row) < 0 ? 1 : -1;
		let dCsign = (prev.col - next.col) < 0 ? 1 : -1;

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
				finalStep.col = (dCol / gcdValue) * dCsign;
				finalStep.row = (dRow / gcdValue) * dRsign;
			}
		}

		return finalStep;
	}


	// Calculate the state of the lock for the next frame
	calculationLoop = (runLoop = true) => {

		if (this._isDragging && this.coordinates) {

			this.forEachNode((x, y) => {

				const dist = Math.sqrt(
					Math.pow(this.coordinates.x - x, 2) +
					Math.pow(this.coordinates.y - y, 2)
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
	}

	// Render the state of the lock
	renderLoop = (runLoop = true) => {
		if (this._isDragging) {
			const {
				colors: { accent, primary },
				dimens: { node_ring: ringWidth }
			} = this.themeState;

			// Clear the canvas(Redundant)
			this.ctx.clearRect(0, 0, this.dimens.width, this.dimens.height);

			// Paint the grid
			this.renderGrid();

			// Plot all the selected nodes
			const lastNode = this.selectedNodes.reduce((prevNode, node) => {
				if (prevNode) {
					const p1 = { x: node.row * this.interval.x, y: node.col * this.interval.y };
					const p2 = { x: prevNode.row * this.interval.x, y: prevNode.col * this.interval.y };

					// Make the two selected nodes bigger
					this.drawNode(p1.x, p1.y, accent, primary, ringWidth + 3);
					this.drawNode(p2.x, p2.y, accent, primary, ringWidth + 3);

					// Join the nodes
					this.joinNodes(prevNode.row, prevNode.col, node.row, node.col);
				}

				return node;
			}, null);

			if (lastNode && this.coordinates) {
				const prevPoint = { x: lastNode.row * this.interval.x, y: lastNode.col * this.interval.y };

				// Draw the last node
				this.drawNode(prevPoint.x, prevPoint.y, accent, primary, ringWidth + 6);

				// Draw a line between last node to the current drag position
				this.joinNodes(prevPoint.x, prevPoint.y, this.coordinates.x, this.coordinates.y, true);
			}
		}

		if (runLoop) {
			raf(this.renderLoop);
		}
	}


	// Render the grid to the canvas
	renderGrid() {
		this.ctx.fillStyle = this.themeState.colors.bg;
		this.ctx.fillRect(0, 0, this.dimens.width, this.dimens.height);

		this.interval = {
			x: this.dimens.width / (this.rows + 1),
			y: this.dimens.height / (this.cols + 1),
		};

		// Draw all the nodes
		this.forEachNode(this.drawNode.bind(this));
	}


	// forEachNode :: ((x, y) -> Boolean) -> ()
	forEachNode(callback) {
		const xGrid = Array(this.rows + 1).fill(this.interval.x);
		const yGrid = Array(this.cols + 1).fill(this.interval.y);

		const breakException = new Error('Break Exception');

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
			if (e !== breakException) throw e;
		}
	}

	drawNode(x, y, centerColor, borderColor, size) {
		const {
			dimens: { node_ring: ringWidth, node_radius: ringRadius, node_core: coreRadius },
			colors: { primary }
		} = this.themeState;

		// Config
		this.ctx.lineWidth = size || ringWidth;
		this.ctx.fillStyle = centerColor || primary;
		this.ctx.strokeStyle = borderColor || primary;

		// Draw inner circle
		this.ctx.beginPath();
		this.ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
		this.ctx.fill();

		// Draw outer ring
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

		// Config
		this.ctx.lineWidth = this.themeState.dimens.line_width;
		this.ctx.strokeStyle = this.themeState.colors.accent;
		this.ctx.lineCap = 'round';

		// Draw line
		this.ctx.beginPath();
		this.ctx.moveTo(point1.x, point1.y);
		this.ctx.lineTo(point2.x, point2.y);
		this.ctx.stroke();
	}

	// Will check if the drawn pattern matches produces a hash from the passed list
	// matchHash :: Array<Hash> -> Matcher
	matchHash = values => {
		const matcher = Matcher(values, this.eventBus);
		this.onComplete(data => matcher.check(data.hash));
		return matcher;
	};
}

export default (...args) => new PatternLock(...args);
