var shouldFade = false;

function checkFade(){
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const fade = urlParams.get('fade')

	if(fade != null){
		shouldFade = true;
		document.getElementById("menu-svg").children[1].setAttribute("points", "0 0, 100 0, 100 35, 100 100, 0 100, 0 35");
	}
}

function fadeAnim(){
	if(shouldFade){
		instOfScreenAnimator.animateMenuClose();
	}else{
		document.getElementById("menu-svg").style.display = "none";
	}
}