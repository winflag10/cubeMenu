//70,0 100,0 100,35 100,100 75,100 60,35
class MenuAnimator extends SvgAnimator{
	constructor(){
		super();
		this.open = false;
	}
	
	animateMenuOpen(){
		let animation = {
			duration:600,
			"id":"menu-svg",
			"frames":[0,0.25,0.5,0.75,1],
			0: [100,0, 100,0, 100,35, 100,100, 100,100, 100,35],
			0.25: [30,0, 100,0, 100,35, 100,100, 100,100, 100,35],
			0.5: [30,0, 100,0, 100,35, 100,100, 100,100, 20,35],
			0.75: [0,0, 100,0, 100,35, 100,100, 35,100, 10,35],
			1: [0,0, 100,0, 100,35, 100,100, 0,100, 0,35],
		}

		if(!this.animating){
			this.animating = true;
			this.active_anim = animation
			window.requestAnimationFrame(this.animateSvg.bind(this));
		}
	}

	animateMenuClose(){
		let animation = {
			duration:600,
			"id":"menu-svg",
			"frames":[0,0.25,0.5,0.75,1],
			0: [0,0, 100,0, 100,35, 100,100, 0,100, 0,35],
			0.25: [0,0, 100,0, 100,35, 100,100, 35,100, 10,35],
			0.5: [30,0, 100,0, 100,35, 100,100, 100,100, 20,35],
			0.75: [30,0, 100,0, 100,35, 100,100, 100,100, 100,35],
			1: [100,0, 100,0, 100,35, 100,100, 100,100, 100,35],
		}

		if(!this.animating){
			this.animating = true;
			this.active_anim = animation
			window.requestAnimationFrame(this.animateSvg.bind(this));
		}
	}
}


instOfScreenAnimator = new MenuAnimator();

function navTo(page){
	if(!instOfScreenAnimator.animating){
		instOfScreenAnimator.hideOnEnd = false;
		instOfScreenAnimator.animateMenuOpen();
		switch(page){
			case("home"):
				setTimeout(()=>{
					window.location.href = "./?fade"
				},600)
				break;
			case("about"):
				setTimeout(()=>{
					window.location.href = "./about?fade"
				},600)
				break;
			case("projects"):
				setTimeout(()=>{
					window.location.href = "./projects?fade"
				},600)
				break;
		}
		
	}
}
