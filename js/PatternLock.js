
window.PatternLock= class {


	constructor(config) {

		this.$canvas= document.querySelector(config.el);
		this.dimens= Object.assign({}, config.dimens);

		this.$canvas.width= config.dimens.width;
		this.$canvas.height= config.dimens.height;
		this.ctx= this.$canvas.getContext('2d');

		this.bounds= this.$canvas.getBoundingClientRect();

		this.coordinates= { x: 0, y: 0 };

		this.NODE_RADIUS= 25;

		this.THEME= {
			accent: '#1abc9c',
			primary: '#ffffff',
			bg: '#2c3e50',
		};

		this._attachListeners();
		this.setInitialState();
	}


	_attachListeners() {

		this._mouseStart= this._mouseStart.bind(this);
		this._mouseEnd= this._mouseEnd.bind(this);
		this._mouseMove= this._mouseMove.bind(this);
		this.renderLoop= this.renderLoop.bind(this);
		this.calculationLoop= this.calculationLoop.bind(this);

		this.$canvas.addEventListener('mousedown', this._mouseStart);
		this.$canvas.addEventListener('mouseup', this._mouseEnd);
		this.$canvas.addEventListener('mousemove', this._mouseMove);

		requestAnimationFrame(this.renderLoop);
		requestAnimationFrame(this.calculationLoop);
	}

	setInitialState() {

		this.pickedNodes= [];
		this.renderLoop(false);
	}


	_mouseStart() {
		this._isDragging= true;
	}

	_mouseEnd() {
		this.setInitialState();
		this._isDragging= false;
	}

	_mouseMove(e) {

		if(this._isDragging) {

			const point= {
				x: e.pageX,
				y: e.pageY,
			};

			point.x-= this.bounds.left;
			point.y-= this.bounds.top;

			if(
				point.x <= this.dimens.width && point.x > 0 &&
				point.y <= this.dimens.height && point.y > 0
			) {
				this.coordinates= point;
			}
		}
	}


	getNode(node) {

		return this.pickedNodes
			.find((p) => p.row == node.row && p.col == node.col);
	}

	calculationLoop() {

		if(this._isDragging) {

			this.forEachHook((x, y) => {

				const dist= Math.sqrt(
					Math.pow(this.coordinates.x - x, 2) + 
					Math.pow(this.coordinates.y - y, 2)
				);

				if(dist < this.NODE_RADIUS) {
					const row= x/this.interval.x;
					const col= y/this.interval.y;

					const node= { row, col };

					const nodeExists= this.getNode(node);

					if(!nodeExists) {

						this.pickedNodes.push(node);

						return false;
					}
				}
			});
		}

		requestAnimationFrame(this.calculationLoop);
	}



	renderLoop(runLoop= true) {

		if(this._isDragging) {

			this.ctx.clearRect(0, 0, this.dimens.width, this.dimens.height);

			this.renderGrid();

			this.pickedNodes
				.reduce((prevNode, node) => {

					if(prevNode) {
						this.joinNodes(
							prevNode.row, prevNode.col,
							node.row, node.col
						);
					}

					return node;
				}, null);
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
			x: this.dimens.width/(this.cols + 1),
			y: this.dimens.height/(this.rows + 1),
		};

		this.plotPatternHook();
	}

	plotPatternHook() {
		this.forEachHook((x, y) => this.drawHook(x, y));		
	}


	forEachHook(fn) {

		const xGrid= Array(this.rows).fill(this.interval.x);
		const yGrid= Array(this.cols).fill(this.interval.y);

		const breakException= new Error('Break Exception');
		
		try {

			yGrid.reduce((y, dy) => {

				xGrid.reduce((x, dx) => {

					if(fn(x, y) === false) {
						throw breakException;
					}

					return x + dx;

				}, this.interval.x);

				return y + dy;

			}, this.interval.y);

		} catch(e) {
			if(e !== breakException)
				throw e;
		}
	}


	drawHook(x, y, centerColor=this.THEME.primary, borderColor=this.THEME.primary, size=1) {

		this.ctx.lineWidth= size;

		this.ctx.fillStyle= centerColor;
		this.ctx.strokeStyle= borderColor;

		this.ctx.beginPath();
		this.ctx.arc(x, y, 8, 0, Math.PI*2);
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
		this.ctx.lineWidth= 7;
		this.ctx.strokeStyle= this.THEME.accent;
		this.ctx.lineCap= 'round';
		this.ctx.moveTo(point1.x, point1.y);
		this.ctx.lineTo(point2.x, point2.y);
		this.ctx.stroke();
	}
};
