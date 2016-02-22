	
	var InstFactory = (function(){
		this.count = 0;
		
		this.createInst = function(options) {
			options.id = count++;
			return new Inst(options);
		}
		
		this.createInsts = function(options, devs, n) {
			var insts = [];
			var xNew, yNew, wNew, hNew, sNew;
			for(var i = 0; i < n; i++){
				
				xNew = (Math.random() < 0.5) ? options.x + (Math.random() * devs.x) : options.x - (Math.random() * devs.x);
				yNew = (Math.random() < 0.5) ? options.y + (Math.random() * devs.y) : options.y - (Math.random() * devs.y);
				wNew = (Math.random() < 0.5) ? options.width + (Math.random() * devs.width) : options.width - (Math.random() * devs.width);
				hNew = (Math.random() < 0.5) ? options.height + (Math.random() * devs.height) : options.height - (Math.random() * devs.height);
				if(options.maxSpeed) sNew = options.maxSpeed;
				if(devs.maxSpeed) {
					(Math.random() < 0.5) ? sNew += (Math.random() * devs.maxSpeed) : sNew -= (Math.random() * devs.maxSpeed);
				}
				
				var c = (i % 2 == 0) ? "rgba(195,144,212,0.7)" : "rgba(144, 195, 212, 0.7)";
				insts.push(createInst({color: c, x: xNew, y: yNew, width: wNew, height: hNew, maxSpeed: sNew}));
			}
			return insts;
		}
		
		return {
			createInst: this.createInst,
			createInsts: this.createInsts,
		};
	})();