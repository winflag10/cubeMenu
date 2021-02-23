var onClick = function(){};
var menuOpen = false;

function initCubeMenu(){
	//Create Boilerplate
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	const canvas = document.querySelector('#menuCube');
	camera.position.z = 2;

	//Init Canvas
	container = document.getElementById( 'canvasContainer' );
	document.body.appendChild( container );
	const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
	renderer.setSize( container.offsetWidth, container.offsetHeight );
	container.appendChild( renderer.domElement );
	
	//Add Lighting
	const skyColor = 0xFFFFFF;  // light blue
    const groundColor = 0xeeeeee;  // brownish orange
    const light = new THREE.HemisphereLight(skyColor, groundColor, 1);
    scene.add(light);

	//Function for adding cube face to scene
	const addPlane = function (axis, angle, material, parent) {
		let planeGeom = new THREE.PlaneGeometry(1, 1, 1, 1);
		planeGeom.translate(0, 0, 0.5);
		switch (axis) {
	    	case 'y':
	      		planeGeom.rotateY(angle);
	      		break;
	    	default:
	      		planeGeom.rotateX(angle);
	  	}

	  	let plane = new THREE.Mesh(planeGeom, material);
	  	plane.updateMatrix();
	  	parent.add(plane);
	}

	//Create cube
	var cube = new THREE.Group();
	const material = new THREE.MeshPhongMaterial( { color: 0xaaffee } );
	addPlane("y",  Math.PI * 0.5, material, cube); //side
	addPlane("y", -Math.PI * 0.5, material, cube); //side
	addPlane("y",  0, material, cube); //side
	addPlane("y",  Math.PI, material, cube);// side
	addPlane("x",  Math.PI * 0.5, material, cube); //bottom
	addPlane("x", -Math.PI * 0.5, material, cube); //top
	scene.add(cube);

	//Keep correct aspect ratio as canvas size changes as menu opens and closes
	const updateForChangeSize = function () {
		container = document.getElementById( 'canvasContainer' );
		renderer.setSize( container.offsetWidth, container.offsetHeight );
		camera.aspect = container.offsetWidth/ container.offsetHeight;
    	camera.updateProjectionMatrix();
	}

	var targetXY;
	var inPosition = false;
	onClick = function(){
		inPosition = false;
		container = document.getElementById( 'menu' ).classList.remove("active");
		menuOpen = !menuOpen;
		if(menuOpen){
			targetXY = Math.ceil(cube.rotation.x/(Math.PI/2)) * (Math.PI/2);
		}
	}

	const animate = function () {
		requestAnimationFrame( animate );

		updateForChangeSize();

		if(!menuOpen){
			if(camera.position.z != 2){
				camera.position.z = Math.round((camera.position.z + 0.05)*10000)/10000;
			}
			cube.rotation.x = (cube.rotation.x + 0.01) % (Math.PI*2);
			cube.rotation.y = (cube.rotation.y + 0.01) % (Math.PI*2);
		}else{
			if(camera.position.z != 1){
				camera.position.z = Math.round((camera.position.z - 0.05)*10000)/10000;
			}

			if(!inPosition){
				if(cube.rotation.x + 0.04 < targetXY){
					cube.rotation.x = (cube.rotation.x + 0.04) % (Math.PI*2);
					cube.rotation.y = (cube.rotation.y + 0.04) % (Math.PI*2);
				}else{
					cube.rotation.x = targetXY;
					cube.rotation.y = targetXY;
					inPosition = true;
				}
			}else{
				//When in position and open
				container = document.getElementById( 'menu' ).classList.add("active");
			}
		}
		renderer.render( scene, camera );
	};

	animate();
}


	