
	function Inst(options){
		this.id = options.id || 0;
		this.color = options.color || "rgba(200,200,200,0.3)";
		this.pos = {};
		this.pos.x = options.x || 50;
		this.pos.y = options.y || 50;
		this.maxSpeed = options.maxSpeed || 13;
		this.rndmMaxSpeed = options.rndmMaxSpeed || 1;
		this.randDir = {};
		this.randDir.x = options.dirX || (Math.random() < 0.5) ? Math.random() * this.maxSpeed : - Math.random() * this.maxSpeed ;
		this.randDir.y = options.dirY || (Math.random() < 0.5) ? Math.random() * this.maxSpeed : - Math.random() * this.maxSpeed ;
		this.followDir = {x: 0, y: 0};
		this.width = options.width || 50;
		this.height = options.height || 50;
		this.decr = options.decr || 0.95;
		
		// corrects outside-the-box-spawners
		while(this.pos.x < 0) this.pos.x += this.width;
		while(this.pos.y < 0) this.pos.y += this.height;
	}
	Inst.prototype.remove = function(cb){
		this.color = "red";
		var that = this;
		window.setTimeout(function(){
			cb(that);
		}, 337);
	}
	Inst.prototype.getDirToPos = function(tarPos) {
		var x = tarPos.x - this.pos.x;
		var y = tarPos.y - this.pos.y;
		return {x: x * 0.1, y: y * 0.1}; // basically percent of distance to cover per loop
	}
	Inst.prototype.getRndmDir = function() {
		var x = (Math.random() < 0.5) ? Math.random() * this.maxSpeed : -Math.random() * this.maxSpeed;
		var y = (Math.random() < 0.5) ? Math.random() * this.maxSpeed : -Math.random() * this.maxSpeed;
		// i want it to be a circle!
		// return this.normalizeRndmDir({x: x, y: y});
		return {x: x, y: y};
	}
	Inst.prototype.normalizeRndmDir = function(dir) {
		var x = dir.x * Math.abs((this.rndmMaxSpeed / dir.x));
		var y = dir.y * Math.abs((this.rndmMaxSpeed / dir.y));
		return {x: x, y: y};
	}
	Inst.prototype.update = function(canvas, following, tarPos){
		
		// moves into direction to move into
		if(following){
			this.followDir = this.getDirToPos(tarPos);
			this.pos.x += this.followDir.x;
			this.pos.y += this.followDir.y;
		}
		
		// random movement
		this.pos.x += this.randDir.x * this.rndmMaxSpeed; // needs normalization. quite random maximums atm
		this.pos.y += this.randDir.y * this.rndmMaxSpeed;
		
		// decides at which minmum speed a new random speed gets assigned
		if(Math.abs(this.randDir.y) > 0.01 && Math.abs(this.randDir.y) > 0.01){
			this.randDir.x *= this.decr;
			this.randDir.y *= this.decr;
		} else {
			this.randDir = this.getRndmDir();
		}
		if(this.pos.x + this.width < 0) this.pos.x = canvas.getAttribute("width") - this.width;
		if(this.pos.y + this.height < 0) this.pos.y = canvas.getAttribute("height") - this.height;
		if(this.pos.x > canvas.getAttribute("width")) this.pos.x = 0;
		if(this.pos.y > canvas.getAttribute("height")) this.pos.y = 0;
		this.draw(canvas.getContext("2d"));
	}
	Inst.prototype.draw = function(ctx) {
		ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	}