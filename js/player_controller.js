$(document).ready(function(){
	$(document).keydown(function(e){
		//Left arrow key
	    if (e.keyCode == 37) {
	    	playerSet((playerGetX() - 1), playerGetY());
	    }

	    //Up arrow key
	    if (e.keyCode == 38) { 
	    	playerSet((playerGetX()), playerGetY() + 1);
	    }

	    //Right arrow key
	    if (e.keyCode == 39) { 
	    	playerSet((playerGetX() + 1), playerGetY());
	    }

	    //Down arrow key
	    if (e.keyCode == 40) { 
	    	playerSet((playerGetX()), playerGetY() - 1);
	    }
	});
});