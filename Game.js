
	function Game(canvas, options){
		this.options = options;
		this.insts = [];
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.running = options.running || true;
		this.fps = options.fps || 25;
		this.collision = options.collision || false;
		this.frames = 0;
		this.following = false;
		this.targetPosition = {x: 0, y: 0};
	}
	Game.prototype.init = function() {
		console.log("initialised flocks with " + this.options.n + " insts, collision: " + (this.options.collision ? "yes" : "no"));
	}
	Game.prototype.run = function() {
		if(this.following && this.frames % this.fps == 0) console.log("trying to get to (" + this.targetPosition.x + ", " + this.targetPosition.y + ")");
		this.ctx.fillStyle = "rgba(255,255,255,0.1)";
		this.ctx.fillRect(0,0,1000,600);
		for(var i = 0; i < this.insts.length; i++){
			this.insts[i].update(this.canvas, this.following, this.targetPosition);
			this.frames++;
			
		}
		if(this.collision) this.checkCollisions();
		window.requestAnimFrame(this.run.bind(this));
	}
	Game.prototype.setInsts = function(insts) {
		this.insts = insts;
	}	
	Game.prototype.getInsts = function() {
		return this.insts;
	}
	Game.prototype.removeInst = function(inst) {
		for(var i = 0; i < this.insts.length; i++){
			if(this.insts[i].id === inst.id) {
				this.insts.splice(i, 1);
			}
		}
	}
	Game.prototype.checkCollisions = function() {
		for(var i = 0; i < this.insts.length; i++){
			var i1 = this.insts[i];
			// top left corner
			for(var j = 0; j < this.insts.length; j++){
				if(j == i) continue;
				var i2 = this.insts[j];
				if(i1.x >= i2.x && 
				   i1.y >= i2.y &&
				   i1.x <= i2.x + i2.width && 
				   i1.y <= i2.y + i2.height){
					if(i1.width * i1.height > i2.width * i2.height){ // volume of i1 larger than i2
						// reduces volume of bigger one by the volume of the smaller one
						// i1.width > i2.width ? i1.width -= i2.width : i1.width = 0;
						// i1.height > i2.height ? i1.height -= i2.height : i1.height = 0;
						i1.dirX = -i1.dirX;
						i1.dirY = -i1.dirY;
						i2.dirX = -i2.dirX;
						i2.dirY = -i2.dirY;
						i2.remove(this.removeInst.bind(this));
					} else {
						// reduces volume of bigger one by the volume of the smaller one
						// i2.width > i1.width ? i2.width -= i1.width : i2.width = 0;
						// i2.height > i1.height ? i2.height -= i1.height : i2.height = 0;
						i1.dirX = -i1.dirX;
						i1.dirY = -i1.dirY;
						i2.dirX = -i2.dirX;
						i2.dirY = -i2.dirY;
						i1.remove(this.removeInst.bind(this));
					}
				}
			}
		}
	}