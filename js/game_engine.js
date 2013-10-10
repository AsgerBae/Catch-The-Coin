$(document).ready(function(){
	/*
		Game core setup
	*/

	//Map

	var size = new Object();
	size.width = 1365;
	size.height = 767;

	var game_canvas = document.getElementById("game_canvas");
	var game_canvas_contaxt = game_canvas.getContext("2d");
	game_canvas.width = size.width;
	game_canvas.height = size.height;

	var mapReady = false;
	var mapImage = new Image();
	mapImage.onload = function () {
		mapReady = true;
	};
	mapImage.src = "sprites/map.png";

	//Player sprite
	var playerReady = false;
	var playerImage = new Image();
	playerImage.onload = function () {
		playerReady = true;
	};
	playerImage.src = "sprites/player.png";

	//Aplying size

	$("#game").css({"width":size.width, "height":size.height});

	/*
		Player setup
	*/

	//Player object

	var player = new Object();
	player.width = 30;
	player.height = 30;
	player.color = "#00a6ff"
	player.speed = 5;

	/*
		Player control functions
	*/

	$(document).keydown(function(e){
		//Left arrow key
	    if (e.keyCode == 37) {
	    	player.x -= player.speed;
	    }

	    //Up arrow key
	    if (e.keyCode == 38) { 
	    	player.y -= player.speed;
	    }

	    //Right arrow key
	    if (e.keyCode == 39) { 
	    	player.x += player.speed;
	    }

	    //Down arrow key
	    if (e.keyCode == 40) { 
	    	player.y += player.speed;
	    }
	});

	//Player get x

	function playerGetX() {
		return player.x;
	}

	//Player get y

	function playerGetY() {
		return size.height - player.y;		//Cause of height starts at top
	}

	//Player set

	function playerSet(x, y) {
		if ((x >= (0)) && (x <= (size.width - player.width))) {
			player.x = x;
		} else if (x > (size.width - player.width)) {
			player.x = size.width - player.width;
		} else if (x < (0)) {
			player.x = 0;
		}

		if ((y >= (0)) && (y <= (size.height - player.height))) {
			player.y = y;
		} else if (y >= (size.height - player.height)) {
			player.y = size.height - player.height;
		} else if (y <= (0)) {
			player.y = 0;
		}
	}

	/*
		Reset
	*/

	function reset() {
		player.x = 100;
		player.y = 100;
	}

	/*
		Render
	*/

	function render() {
		//Map
		if (mapReady) {
			game_canvas_contaxt.drawImage(mapImage, 0, 0);
		}

		//Player
		playerSet(player.x, player.y);

		if (playerReady) {
			game_canvas_contaxt.drawImage(playerImage, player.x, player.y);
		}
	}

	/*
		Game loop
	*/

	reset();
	setInterval(function(){render()}, 1);
});