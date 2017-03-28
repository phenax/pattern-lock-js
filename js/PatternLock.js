
window.PatternLock= class {


	constructor(config) {

		this.$canvas= document.querySelector(config.el);
		this.dimens= Object.assign({}, config.dimens);

		this.$canvas.width= config.dimens.width;
		this.$canvas.height= config.dimens.height;
		this.ctx= this.$canvas.getContext('2d');

		this.bounds= this.$canvas.getBoundingClientRect();

		this.coordinates= { x: 0, y: 0 };

		this.THEME= {
			accent: '#1abc9c',
			primary: '#ffffff',
			bg: '#2c3e50',
		};
	}


	attachListeners() {

		this._mouseStart= this._mouseStart.bind(this);
		this._mouseEnd= this._mouseEnd.bind(this);
		this._mouseMove= this._mouseMove.bind(this);
		this.renderLoop= this.renderLoop.bind(this);

		this.$canvas.addEventListener('mousedown', this._mouseStart);
		this.$canvas.addEventListener('mouseup', this._mouseEnd);
		this.$canvas.addEventListener('mousemove', this._mouseMove);

		requestAnimationFrame(this.renderLoop);
	}


	_mouseStart() {
		this._isDragging= true;
	}

	_mouseEnd() {
		this._isDragging= false;
	}

	_mouseMove(e) {
		console.log('move');

		if(this._isDragging) {

			this.coordinates= {
				x: e.pageX - this.bounds.left,
				y: e.pageY - this.bounds.top,
			};
		}
	}


	renderLoop() {

		const nodeRadius= 10;

		if(this._isDragging) {

			this.forEachHook((x, y) => {

				const dist= Math.sqrt(
					Math.pow(this.coordinates.x - x, 2) + 
					Math.pow(this.coordinates.y - y, 2)
				);

				console.log(dist);

				if(dist < nodeRadius) {
					console.log(x, y);
				}
			});
		}

		requestAnimationFrame(this.renderLoop);
	}


	generateGrid(rows, cols) {

		this.rows= rows;
		this.cols= cols;

		this.ctx.fillStyle= this.THEME.bg;
		this.ctx.fillRect(0, 0, this.dimens.width, this.dimens.height);

		this.interval= {
			x: this.dimens.width/(cols + 1),
			y: this.dimens.height/(rows + 1),
		};

		this.plotPatternHook();
	}

	plotPatternHook() {
		this.forEachHook((x, y) => this.drawHook(x, y));		
	}


	forEachHook(fn) {

		const xGrid= Array(this.rows).fill(this.interval.x);
		const yGrid= Array(this.cols).fill(this.interval.y);

		
		yGrid.reduce((y, dy) => {

			xGrid.reduce((x, dx) => {

				fn(x, y);

				return x + dx;

			}, this.interval.x);

			return y + dy;

		}, this.interval.y);
	}


	drawHook(x, y, centerColor=this.THEME.primary, borderColor=this.THEME.primary) {

		this.ctx.fillStyle= centerColor;
		this.ctx.strokeStyle= borderColor;

		this.ctx.beginPath();
		this.ctx.arc(x, y, 8, 0, Math.PI*2);
		this.ctx.fill();

		this.ctx.beginPath();
		this.ctx.arc(x, y, 20, 0, Math.PI*2);
		this.ctx.stroke();
	}


	joinNodes(row1, col1, row2, col2) {

		const point1= {
			x: this.interval.x*row1,
			y: this.interval.y*col1,
		};

		const point2= {
			x: this.interval.x*row2,
			y: this.interval.y*col2,
		};

		this.ctx.lineWidth= 3;

		this.drawHook(point1.x, point1.y, this.THEME.accent, this.THEME.primary);
		this.drawHook(point2.x, point2.y, this.THEME.accent, this.THEME.primary);

		this.ctx.beginPath();
		this.ctx.lineWidth= 7;
		this.ctx.strokeStyle= this.THEME.accent;
		this.ctx.lineCap= 'round';
		this.ctx.moveTo(point1.x, point1.y);
		this.ctx.lineTo(point2.x, point2.y);
		this.ctx.stroke();
	}

};
