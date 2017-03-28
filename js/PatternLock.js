
window.PatternLock= class {


	constructor(config) {

		this.$canvas= document.querySelector(config.el);
		this.dimens= Object.assign({}, config.dimens);

		this.$canvas.width= this.dimens.width;
		this.$canvas.height= this.dimens.height;
		this.ctx= this.$canvas.getContext('2d');

		this.bounds= this.$canvas.getBoundingClientRect();

		this.NODE_RADIUS= 25;
		this.LINE_WIDTH= 7;

		this.THEME= {
			accent: '#1abc9c',
			primary: '#ffffff',
			bg: '#2c3e50',
		};

		this.setInitialState();
		this._attachListeners();
	}


	_attachListeners() {

		this._mouseStartHandler= this._mouseStartHandler.bind(this);
		this._mouseEndHandler= this._mouseEndHandler.bind(this);
		this._mouseMoveHandler= this._mouseMoveHandler.bind(this);

		this.renderLoop= this.renderLoop.bind(this);
		this.calculationLoop= this.calculationLoop.bind(this);


		this.$canvas.addEventListener('mousedown', this._mouseStartHandler);
		this.$canvas.addEventListener('mouseup', this._mouseEndHandler);
		this.$canvas.addEventListener('mousemove', this._mouseMoveHandler);

		requestAnimationFrame(this.renderLoop);
		requestAnimationFrame(this.calculationLoop);
	}

	setInitialState() {

		this.coordinates= { x: 0, y: 0 };
		this.selectedNodes= [];
	}


	_mouseStartHandler(e) {
		e.preventDefault();

		this.setInitialState();
		this.calculationLoop(false);
		this.renderLoop(false);

		this._isDragging= true;
	}

	_mouseEndHandler(e) {
		e.preventDefault();

		this._isDragging= false;
	}

	_mouseMoveHandler(e) {

		e.preventDefault();

		if(this._isDragging) {

			const mousePoint= {
				x: e.pageX,
				y: e.pageY,
			};

			mousePoint.x-= this.bounds.left;
			mousePoint.y-= this.bounds.top;

			if(
				mousePoint.x <= this.dimens.width && mousePoint.x > 0 &&
				mousePoint.y <= this.dimens.height && mousePoint.y > 0
			) {
				this.coordinates= mousePoint;
			}
		}
	}


	hasNode(targetNode) {

		return !!this.selectedNodes.find(
			node => (
				node.row == targetNode.row &&
				node.col == targetNode.col
			)
		);
	}

	calculationLoop(runLoop= true) {

		if(this._isDragging) {

			this.forEachNode((x, y) => {

				const dist= Math.sqrt(
					Math.pow(this.coordinates.x - x, 2) + 
					Math.pow(this.coordinates.y - y, 2)
				);

				if(dist < this.NODE_RADIUS) {

					const row= x/this.interval.x;
					const col= y/this.interval.y;

					const currentNode= { row, col };

					if(!this.hasNode(currentNode)) {
						this.selectedNodes.push(currentNode);
						return false;
					}
				}
			});
		}

		if(runLoop) {
			requestAnimationFrame(this.calculationLoop);
		}
	}



	renderLoop(runLoop= true) {

		if(this._isDragging) {

			this.ctx.clearRect(0, 0, this.dimens.width, this.dimens.height);

			this.renderGrid();

			const lastNode=
				this.selectedNodes
					.reduce((prevNode, node) => {

						if(prevNode) {
							this.joinNodes(
								prevNode.row, prevNode.col,
								node.row, node.col
							);
						}

						return node;
					}, null);

			// if(lastNode) {

			// 	lastNode.row*= this.interval.x;
			// 	lastNode.col*= this.interval.y;

			// 	this.joinNodes(
			// 		lastNode.row, lastNode.col,
			// 		this.coordinates.x, this.coordinates.y,
			// 		true  // IsCoordinates instead of row and column position
			// 	);
			// }
		}

		if(runLoop) {
			requestAnimationFrame(this.renderLoop);
		}
	}



	generateGrid(rows, cols) {

		this.rows= rows;
		this.cols= cols;

		this.renderGrid();
	}

	renderGrid() {

		this.ctx.fillStyle= this.THEME.bg;
		this.ctx.fillRect(0, 0, this.dimens.width, this.dimens.height);

		this.interval= {
			x: this.dimens.width/(this.rows + 1),
			y: this.dimens.height/(this.cols + 1),
		};

		this.plotPatternHook();
	}

	plotPatternHook() {
		this.forEachNode(this.drawHook.bind(this));		
	}


	forEachNode(callback) {

		const xGrid= Array(this.rows).fill(this.interval.x);
		const yGrid= Array(this.cols).fill(this.interval.y);

		const breakException= new Error('Break Exception');
		
		try {

			yGrid.reduce((y, dy) => {

				xGrid.reduce((x, dx) => {

					if(callback(x, y) === false)
						throw breakException;

					return x + dx;

				}, this.interval.x);

				return y + dy;

			}, this.interval.y);

		} catch(e) {
			if(e !== breakException) throw e;
		}
	}


	drawHook(x, y, centerColor=this.THEME.primary, borderColor=this.THEME.primary, size=1) {

		this.ctx.lineWidth= size;

		this.ctx.fillStyle= centerColor;
		this.ctx.strokeStyle= borderColor;

		this.ctx.beginPath();
		this.ctx.arc(x, y, this.LINE_WIDTH + 2, 0, Math.PI*2);
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.arc(x, y, this.NODE_RADIUS, 0, Math.PI*2);
		this.ctx.stroke();
	}


	joinNodes(row1, col1, row2, col2, isCoordinates=false) {

		let factor= this.interval;

		if(isCoordinates) {
			factor= { x: 1, y: 1 };
		}

		const point1= {
			x: factor.x*row1,
			y: factor.y*col1,
		};

		const point2= {
			x: factor.x*row2,
			y: factor.y*col2,
		};

		this.drawHook(point1.x, point1.y, this.THEME.accent, this.THEME.primary, 5);
		this.drawHook(point2.x, point2.y, this.THEME.accent, this.THEME.primary, 5);

		this.ctx.beginPath();
		this.ctx.lineWidth= this.LINE_WIDTH;
		this.ctx.strokeStyle= this.THEME.accent;
		this.ctx.lineCap= 'round';
		this.ctx.moveTo(point1.x, point1.y);
		this.ctx.lineTo(point2.x, point2.y);
		this.ctx.stroke();
	}
};
