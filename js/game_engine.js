/*
	Game core setup
*/

//Map size

var size = new Object();
size.width = 750;
size.height = 750;

//Aplying size

$(document).ready(function(){
	$("#game").css({"width":size.width, "height":size.height});
});

/*
	Player setup
*/

//Player object

var player = new Object();
player.width = 30;
player.height = 30;
player.color = "#00a6ff"
player.x = 100;
player.y = 100;
player.speed = 1.0;

objectIntalizer("player");

//Player canvas

$(document).ready(function(){
	//Height and width
	$("#player").attr({"width":player.width, "height":player.height});

	//Startup location
	//$("#player").css({"left":player.x, "top":player.y});
	playerSet(100, 100);

	var player_canvas = document.getElementById("player");
	var player_canvas_content = player_canvas.getContext("2d");
	player_canvas_content.fillStyle = player.color;
	player_canvas_content.fillRect(0, 0 , player.width, player.height);
});

/*
	Player control functions
*/

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
	if (x < (size.width + player.width)) {
		player.x = x;
		$("#player").css("left", player.x);
	} else {
		player.x = (size.width - player.width);
		$("#player").css("left", (size.width - player.width));
	}

	if (y < (size.height + player.width)) {
		player.y = size.height - y;
		$("#player").css("top", player.y);
	} else {
		player.y = size.height - (size.height - player.height);
		$("#player").css("top", size.height - (size.height - player.height));
	}
}

/*
	Object control
*/

function objectIntalizer(object) {
	$(document).ready(function(){
		$("#" + object).css({"position":"absolute"});
	});
}