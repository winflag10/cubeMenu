class SvgAnimator{
	constructor(){
		this.start = undefined;
		this.animating = false;
		this.active_anim = null;
		this.hideOnEnd = true;
	}

	animateSvg(){
		document.getElementById(this.active_anim.id).style.display = "flex";

		//Start
		if(this.start===undefined){
			this.start = performance.now()
		}

		//Get perc_through
		let perc_through = (performance.now()-this.start) / this.active_anim.duration

		//Calc position for active frame
		let going_to = 0
		for (var i = 0; i < this.active_anim.frames.length; i++) {
			if(perc_through > this.active_anim.frames[i]){
				going_to = i
			}
		}
		let going_from = this.active_anim.frames[going_to]
		going_to = this.active_anim.frames[going_to+1]
		// 0 -> 0.2

		if(going_from != 1){

			//calc perc_through_frame
			let perc_through_frame = ((performance.now()-this.start) - this.active_anim.duration * going_from) / (this.active_anim.duration * going_to - this.active_anim.duration * going_from)

			let points_string = ""
			for ( let i=0; i<this.active_anim[going_from].length/2; i++){
				let x = this.active_anim[going_from][i*2]
				let y = this.active_anim[going_from][(i*2) +1]

				let new_x = this.active_anim[going_to][i*2] 
				let new_y = this.active_anim[going_to][(i*2) +1] 

				// x from last frame + xdiff * perc_through_frame
				let calc_x = x + ((new_x-x)*perc_through_frame)
				let calc_y = y + ((new_y-y)*perc_through_frame)

				
				points_string += calc_x.toString() + ", " + calc_y.toString() + " "
			}

			//Set positions
			document.getElementById(this.active_anim.id).children[1].setAttribute("points", points_string)

		}else{
			let points_string = ""
			for ( let i=0; i<this.active_anim[going_from].length/2; i++){
				let new_x = this.active_anim[going_from][i*2] 
				let new_y = this.active_anim[going_from][(i*2) +1] 
				points_string += new_x.toString() + ", " + new_y.toString() + " "
			}
			document.getElementById(this.active_anim.id).children[1].setAttribute("points", points_string)
		}

		//End
		if(performance.now()-this.start < this.active_anim.duration){
			window.requestAnimationFrame(this.animateSvg.bind(this));
		}else{
			this.start = undefined;
			this.animating = false;
			if(this.hideOnEnd){
				document.getElementById(this.active_anim.id).style.display = "none";
			}
		}
	}
}