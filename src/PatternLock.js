import EventBus from './utils/EventBus';
import { patternToWords, hashCode, gcd } from './utils/libs';
import { registerEvent, getPixelRatio, raf } from './utils/dom';
import Matcher from './utils/Matcher';
import THEMES from './utils/themes';


// type Theme = String | Object
// type Node = { row :: Number, col :: Number }
// type Point = { x :: Number, y: Number }

const createInvalidOptionError = option => new Error(`Invalid or empty ${option} passed`);

const events = {
	PATTERN_COMPLETE: 'complete',
	PATTERN_START: 'start',
};

const defaultConfig = {
	theme: 'default',
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

	setGrid(rows, cols) {
		this.rows = rows;
		this.cols = cols;

		this.setInitialState();
		this._onResize();
		this.forceRender();
	}

	// setTheme :: (Theme, Boolean) -> Theme
	setTheme(theme, rerender = true) {

		const defaultTheme = THEMES.default;

		if(typeof theme === 'string') {
			theme = THEMES[theme];
		}

		if(!theme) throw createInvalidOptionError('theme');

		this.THEME = this.THEME || {};
		this.THEME.colors = { ...defaultTheme.colors, ...theme.colors };
		this.THEME.dimens = { ...defaultTheme.dimens, ...theme.dimens };

		rerender && this.forceRender();

		return this.THEME;
	}

	/**
	 * Attach event listeners and start frame loops
	 */
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

	// recalculateBounds :: () -> Point
	recalculateBounds = () => this.bounds = ({
		x: this.$canvas.offsetLeft,
		y: this.$canvas.offsetTop,
	});

	_onResize = () => {
		raf(this.recalculateBounds);
	}

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

			console.log({ mousePoint, bounds: this.bounds });

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

	// Adds intermediary nodes between lastSelectedNode and the targetNode
	// addIntermediaryNodes :: Node -> ()
	addIntermediaryNodes(targetNode) {
		const stepNode = this.getIntermediaryStepDirection(this.lastSelectedNode, targetNode);

		if (stepNode.row !== 0 || stepNode.col !== 0) {
			let currentNode = {
				row: this.lastSelectedNode.row + stepNode.row,
				col: this.lastSelectedNode.col + stepNode.col
			};

			const maxIterations = Math.max(this.rows, this.cols);

			let i = 0;
			while (i++ < maxIterations && (currentNode.row !== targetNode.row || currentNode.col !== targetNode.col)) {
				this.selectedNodes.push(currentNode);
				currentNode = {
					row: currentNode.row + stepNode.row,
					col: currentNode.col + stepNode.col,
				};
			}
		}

		this.lastSelectedNode = targetNode;
	}

	// Returns the step direction to select intermediary nodes
	// INFO: Can be moved out of the class as it is independent of `this`
	// getIntermediaryStepDirection :: (Node, Node) -> Node
	getIntermediaryStepDirection(previousNode, nextNode) {
		let finalStep = { row: 0, col: 0 };
		if (!previousNode) {
			return finalStep;
		}

		const dRow = Math.abs(previousNode.row - nextNode.row);
		const dCol = Math.abs(previousNode.col - nextNode.col);

		if (dRow === 1 || dCol === 1) {
			return finalStep;
		}

		let dRsign = (previousNode.row - nextNode.row) < 0 ? 1 : -1;
		let dCsign = (previousNode.col - nextNode.col) < 0 ? 1 : -1;

		if (dRow === 0) {
			if (dCol !== 0) finalStep.col = dCsign;
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

				if (dist < this.THEME.dimens.node_radius + 1) {

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
			const { accent, primary } = this.THEME.colors;

			// Clear the canvas(Redundant)
			this.ctx.clearRect(0, 0, this.dimens.width, this.dimens.height);

			this.renderGrid();

			// Plot all the selected nodes
			const lastNode = this.selectedNodes.reduce((prevNode, node) => {
				if (prevNode) {

					const point1 = { x: node.row * this.interval.x, y: node.col * this.interval.y };
					const point2 = { x: prevNode.row * this.interval.x, y: prevNode.col * this.interval.y };

					// Make the two selected nodes bigger
					this.drawNode(
						point1.x, point1.y,
						accent, primary,
						this.THEME.dimens.node_ring + 3
					);
					this.drawNode(
						point2.x, point2.y,
						accent, primary,
						this.THEME.dimens.node_ring + 3
					);

					// Join the nodes
					this.joinNodes(
						prevNode.row, prevNode.col,
						node.row, node.col
					);
				}

				return node;
			}, null);


			if (lastNode && this.coordinates) {

				// Draw the last node
				this.drawNode(
					lastNode.row * this.interval.x, lastNode.col * this.interval.y,
					accent, primary,
					this.THEME.dimens.node_ring + 6
				);

				// Draw a line between last node to the current drag position
				this.joinNodes(
					lastNode.row * this.interval.x, lastNode.col * this.interval.y,
					this.coordinates.x, this.coordinates.y,
					true
				);
			}
		}

		if (runLoop) {
			raf(this.renderLoop);
		}
	}


	/**
	 * Render the grid to the canvas
	 */
	renderGrid() {
		this.ctx.fillStyle = this.THEME.colors.bg;
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

		const xGrid = Array(this.rows).fill(this.interval.x);
		const yGrid = Array(this.cols).fill(this.interval.y);

		const breakException = new Error('Break Exception');

		try {

			yGrid.reduce((y, dy) => {

				xGrid.reduce((x, dx) => {

					// If the callback returns false, break out of the loop
					if (callback(x, y) === false)
						throw breakException;

					return x + dx;

				}, this.interval.x);

				return y + dy;

			}, this.interval.y);

		} catch (e) {
			if (e !== breakException) throw e;
		}
	}

	drawNode(x, y, centerColor, borderColor, size) {

		// Config
		this.ctx.lineWidth = size || this.THEME.dimens.node_ring;
		this.ctx.fillStyle = centerColor || this.THEME.colors.primary;
		this.ctx.strokeStyle = borderColor || this.THEME.colors.primary;

		// Draw inner circle
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.THEME.dimens.node_core, 0, Math.PI * 2);
		this.ctx.fill();

		// Draw outer ring
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.THEME.dimens.node_radius, 0, Math.PI * 2);
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
		this.ctx.lineWidth = this.THEME.dimens.line_width;
		this.ctx.strokeStyle = this.THEME.colors.accent;
		this.ctx.lineCap = 'round';

		// Draw line
		this.ctx.beginPath();
		this.ctx.moveTo(point1.x, point1.y);
		this.ctx.lineTo(point2.x, point2.y);
		this.ctx.stroke();
	}


	// _match :: String -> (...any) -> Matcher
	_match = type => (...values) => {
		const matcher = Matcher(values);
		this.onComplete(data => matcher.check(data[type]));
		return matcher;
	};
	matchHash = this._match('hash');
}

export default (...args) => new PatternLock(...args);
