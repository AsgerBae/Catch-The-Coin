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

	var mapImage = new Image();
	mapImage.src = "sprites/map.png";

	//Player sprite
	var playerImage = new Image();
	playerImage.src = "sprites/player.png";

	//Coin sprites
	var coinImage = new Array();

	for (var counter = 0;counter < 9;counter++) {
		coinImage[counter] = new Image();
		coinImage[counter].src = 'sprites/Coin/Coin' + counter + '.png';
	}

	var coinImageCurrent = 1;
	var coinHalfer = false;

	//Aplying size

	$("#game").css({"width":size.width, "height":size.height});

	/*
		Player setup
	*/

	//Player object

	var player = new Object();
	player.width = 32;
	player.height = 32;
	player.color = "#00a6ff"
	player.speed = 20;

	/*
		Player control functions
	*/

	//Key down checkers

	var keysDown = [0, 0, 0, 0];

	//Check if button is held down

	$(document).keydown(function(e){
	    var keyC = e.keyCode;	
	    //Left arrow key
	    if (keyC == 37 || keyC == 65) {
	    	keysDown[0] = 1;
	    }

	    //Up arrow key
	    if (keyC == 38 || keyC == 87) { 
	    	keysDown[1] = 1;
	    }

	    //Right arrow key
	    if (keyC == 39 || keyC == 68) { 
	    	keysDown[2] = 1;
	    }

	    //Down arrow key
	    if (keyC == 40 || keyC == 83) { 
	    	keysDown[3] = 1;
	    }
	});

	//Check if key goes up

	$(document).keyup(function(e){
	    var keyC = e.keyCode;	
	    //Left arrow key
	    if (keyC == 37 || keyC == 65) {
	    	keysDown[0] = 0;
	    }

	    //Up arrow key
	    if (keyC == 38 || keyC == 87) { 
	    	keysDown[1] = 0;
	    }

	    //Right arrow key
	    if (keyC == 39 || keyC == 68) { 
	    	keysDown[2] = 0;
	    }

	    //Down arrow key
	    if (keyC == 40 || keyC == 83) { 
	    	keysDown[3] = 0;
	    }
	});

	//Get keyboard changes

	function checkForKeyboardChanges() {
	    //Left arrow key
	    if (keysDown[0] == 1) {
	    	if (keysDown[1] == 1 && keysDown[3] == 1) {
	    		player.x -= player.speed;
	    	} else if (keysDown[1] == 1 && keysDown[3] == 0) {
	    		player.x -= player.speed / 2;
	    	} else if (keysDown[3] == 1 && keysDown[1] == 0) {
	    		player.x -= player.speed / 2;
	    	} else {
	    		player.x -= player.speed;
	    	}
	    }

	    //Up arrow key
	    if (keysDown[1] == 1) {
	    	if (keysDown[2] == 1 && keysDown[0] == 1) {
	    		player.y -= player.speed;
	    	} else if (keysDown[2] == 1 && keysDown[0] == 0) {
	    		player.y -= player.speed / 2;
	    	} else if (keysDown[0] == 1 && keysDown[2] == 0) {
	    		player.y -= player.speed / 2;
	    	} else {
	    		player.y -= player.speed;
	    	}
	    }

	    //Right arrow key
	    if (keysDown[2] == 1) {
	    	if (keysDown[1] == 1 && keysDown[3] == 1) {
	    		player.x += player.speed;
	    	} else if (keysDown[1] == 1 && keysDown[3] == 0) {
	    		player.x += player.speed / 2;
	    	} else if (keysDown[3] == 1 && keysDown[1] == 0) {
	    		player.x += player.speed / 2;
	    	} else {
	    		player.x += player.speed;
	    	}
	    }

	    //Down arrow key
	    if (keysDown[3] == 1) {
	    	if (keysDown[2] == 1 && keysDown[0] == 1) {
	    		player.y += player.speed;
	    	} else if (keysDown[2] == 1 && keysDown[0] == 0) {
	    		player.y += player.speed / 2;
	    	} else if (keysDown[0] == 1 && keysDown[2] == 0) {
	    		player.y += player.speed / 2;
	    	} else {
	    		player.y += player.speed;
	    	}
	    }
	}

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
		Coin spawner
	*/

	function spawnNewCoin() {
		coin.x = Math.floor((Math.random()*(size.width - coin.width)));
		coin.y = Math.floor((Math.random()*(size.height - coin.width)));

		while (
			player.x <= (coin.x + player.width)
			&& coin.x <= (player.x + coin.width)
			&& player.y <= (coin.y + player.height)
			&& coin.y <= (player.y + coin.height)
		) {
			coin.x = Math.floor((Math.random()*(size.width - coin.width)));
			coin.y = Math.floor((Math.random()*(size.height - coin.width)));
		}
	}

	//Coin object

	var coin = new Object();
	coin.width = 32;
	coin.height = 32;

	//Check touch
	function checkTouchWithCoin() {
		if (
			player.x <= (coin.x + player.width)
			&& coin.x <= (player.x + coin.width)
			&& player.y <= (coin.y + player.height)
			&& coin.y <= (player.y + coin.height)
		) {
			player.point++;
			spawnNewCoin();
		}
	}

	/*
		Reset
	*/

	function reset() {
		player.x = 100;
		player.y = 100;
		player.point = 0;
		spawnNewCoin();
	}

	/*
		Render
	*/

	function render() {
		//Map
		game_canvas_contaxt.drawImage(mapImage, 0, 0);

		//Coin
		checkTouchWithCoin();
		if (coinImageCurrent < coinImage.length - 1) {
			if (coinHalfer) {
				coinImageCurrent++;
				coinHalfer = false;
			} else {
				coinHalfer = true;
			}
		} else {
			coinImageCurrent = 0;
		}
		game_canvas_contaxt.drawImage(coinImage[coinImageCurrent], coin.x, coin.y);

		//Player
		checkForKeyboardChanges();
		playerSet(player.x, player.y);
		game_canvas_contaxt.drawImage(playerImage, player.x, player.y);

		// Score
		game_canvas_contaxt.fillStyle = "#130f30";
		game_canvas_contaxt.font = "24px Helvetica";
		game_canvas_contaxt.textAlign = "left";
		game_canvas_contaxt.textBaseline = "top";
		game_canvas_contaxt.fillText("Points: " + player.point, 16, 16);
	}

	/*
		Game loop
	*/

	reset();
	setInterval(function(){render()}, 1000/30);
});
