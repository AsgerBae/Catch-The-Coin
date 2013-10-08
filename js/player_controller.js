$(document).ready(function(){
	$(document).keydown(function(e){
		//Left arrow key
	    if (e.keyCode == 37) {
	    	console.log("left pressed");
	    	playerSet((playerGetX()), playerGetY());
	    }

	    //Up arrow key
	    if (e.keyCode == 38) { 
	       console.log("up pressed" + playerGetX());
	    }

	    //Right arrow key
	    if (e.keyCode == 39) { 
	       console.log("right pressed");
	    }

	    //Down arrow key
	    if (e.keyCode == 40) { 
	       console.log("down pressed");
	    }
	});
});