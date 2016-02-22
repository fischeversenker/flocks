
	function Inst(options){
		this.id = options.id || 0;
		this.color = options.color || "rgba(200,200,200,0.3)";
		this.pos = {};
		this.pos.x = options.x || 50;
		this.pos.y = options.y || 50;
		this.maxSpeed = options.maxSpeed || 13;
		this.dir = {};
		this.dir.x = options.dirX || (Math.random() < 0.5) ? Math.random() * this.maxSpeed : - Math.random() * this.maxSpeed ;
		this.dir.y = options.dirY || (Math.random() < 0.5) ? Math.random() * this.maxSpeed : - Math.random() * this.maxSpeed ;
		this.width = options.width || 50;
		this.height = options.height || 50;
		this.decr = options.decr || 0.95;
		while(this.x < 0) this.x += this.width;
		while(this.y < 0) this.y += this.height;
	}
	Inst.prototype.remove = function(cb){
		this.color = "red";
		var that = this;
		window.setTimeout(function(){
			cb(that);
		}, 337);
	}
	Inst.prototype.getDirToPos = function(tarPos) {
		var x = this.pos.x - tarPos.x;
		var y = this.pos.y - tarPos.y;
		return {x: x, y: y};
	}
	Inst.prototype.update = function(canvas, following, tarPos){
		// if(following) this.dir = this.getDirToPos(tarPos);
		// else {
			this.x += this.dir.x;
			this.y += this.dir.y;
		// }
		
		if(Math.abs(this.dir.y) > 0.0001){
			this.dir.x *= this.decr;
		} else {
			this.dir.x = (Math.random() < 0.5) ? Math.random() * this.maxSpeed : -Math.random() * this.maxSpeed ;
		}
		if(Math.abs(this.dir.y) > 0.0001){
			this.dir.y *= this.decr;
		} else {
			this.dir.y = (Math.random() < 0.5) ? Math.random() * this.maxSpeed : -Math.random() * this.maxSpeed ;
		}
		if(this.x + this.width < 0) this.x = canvas.width - this.width;
		if(this.y + this.height < 0) this.y = canvas.height - this.height;
		if(this.x > canvas.getAttribute("width")) this.x = 0;
		if(this.y > canvas.getAttribute("height")) this.y = 0;
		this.draw(canvas.getContext("2d"));
	}
	Inst.prototype.draw = function(ctx) {
		ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
	}