	// for game loop animation
	window.requestAnimFrame = (function() {
		return  window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				};
	})();

	function initEventhandlers(game) {
		$(game.canvas).mouseover(function(){
			game.following = true;
		});
		$(game.canvas).mousemove(function(e){
			var offset = $(game.canvas).offset();
			game.targetPosition = {x: e.pageX - offset.left, y: e.pageY - offset.top};
		});
		$(game.canvas).mouseout(function(){
			game.following = false;
		});
	}
	
	// initialises and starts the game
	var flock = function() {
			
		var options = {x: 500,
					   y: 300,
					   width: 13,
					   height: 13,
					   maxSpeed: 4,
					   decr: 0.99};
		var devs = 	  {x: 500,
					   y: 300,
					   width: 7,
					   height: 7};
		var n = 	   512;
		
		var canvas = document.getElementById("canvas");
		
		
		var game = new Game(document.getElementById("canvas"), {collision: false, n: n});
		game.setInsts(InstFactory.createInsts(options, devs, n));
		initEventhandlers(game);
		game.init();
		game.run();

	}