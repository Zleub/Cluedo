//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-06T01:07:54+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-25T00:41:59+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

let Scene = (canvas) => {
	let scene = new THREE.Scene()
	let camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 )

	let renderer = new THREE.WebGLRenderer({
		canvas: canvas
	})
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	var raycaster = new THREE.Raycaster()

	let texture = new THREE.TextureLoader().load( "assets/block/bedrock.png" )
	texture.magFilter	= THREE.NearestFilter;
	texture.minFilter	= THREE.NearestFilter;
	let geometry = new THREE.BoxGeometry( 1, 1, 1 )
	let material = new THREE.MeshPhongMaterial( {
		color: 0xa5a5a5,
		// map: texture,
		wireframe: true
	} )

	// for (let i = -4.5; i < 5; i += 1) {
	// 	for (let j = -4.5; j < 5; j += 1) {
	// 		let cube = new THREE.Mesh( geometry, material )
	// 		cube.position.set( i, 0, j)
	// 		cube.castShadow = true
	// 		cube.receiveShadow = true
	// 		scene.add( cube )
	// 	}
	// }

	let vector = new THREE.Vector3()
	let center = new THREE.Vector3()
	let spherical = new THREE.Spherical()
	let normalMatrix = new THREE.Matrix3()
	let rotate = ( delta ) => {
		vector.copy( camera.position ).sub( center );

		spherical.setFromVector3( vector );
		spherical.theta += delta.x / 200;
		spherical.phi += delta.y / 200;
		spherical.makeSafe();

		vector.setFromSpherical( spherical );

		camera.position.copy( center ).add( vector );
		camera.lookAt( center );
	}

	let pan = function ( delta ) {
		let distance = camera.position.distanceTo( center );

		delta.multiplyScalar( distance * 0.001 );
		delta.applyMatrix3( normalMatrix.getNormalMatrix( camera.matrix ) );

		camera.position.add( delta );
		center.add( delta );
	}

	let STATE = { NONE: - 1, ROTATE: 0, ZOOM: 1, PAN: 2 }
	let state = STATE.NONE
	let pointer = new THREE.Vector2()
	let pointerOld = new THREE.Vector2()

	canvas.addEventListener('wheel', ( event ) => {
		event.preventDefault();
		zoom( new THREE.Vector3( 0, 0, event.deltaY ) )
	})

	zoom = function ( delta ) {
		let distance = camera.position.distanceTo( center );
		delta.multiplyScalar( distance * 0.001 );

		if ( delta.length() > distance )
			return;

		delta.applyMatrix3( normalMatrix.getNormalMatrix( camera.matrix ) );
		camera.position.add( delta );
	}

	canvas.addEventListener("dblclick", (e) => {
		let mouse = new THREE.Vector2(e.offsetX / canvas.width * 2 - 1, -(e.offsetY / canvas.height) * 2 + 1)

		raycaster.setFromCamera( mouse, camera )

		let _ = raycaster.intersectObjects( scene.children, true )[0]

		if (_) {
			if (_.object.userData.parent && _.object.userData.parent != scene.mainCharacter) {
				_.object.userData.parent.lookAt(new THREE.Vector3(scene.mainCharacter.position.x, 1.1, scene.mainCharacter.position.z))
				console.log(_.object.userData.parent)
				scene.dialog.setTitle(_.object.userData.parent.name)
				scene.dialog.toggle()
				return
			}
			else if ( _.object.userData.parent == scene.mainCharacter) {
				return
			}

			let {object} = _
			scene.mainCharacter.lookAt( new THREE.Vector3(object.position.x, 1.1, object.position.z) )
			scene.mainCharacter.walk()
		}
	})
	canvas.addEventListener("click", (e) => {
		let mouse = new THREE.Vector2(e.offsetX / canvas.width * 2 - 1, -(e.offsetY / canvas.height) * 2 + 1)

		raycaster.setFromCamera( mouse, camera )

		let _ = raycaster.intersectObjects( scene.children )[0]

		if (_) {
			let {object} = _
			scene.mainCharacter.lookAt( new THREE.Vector3(object.position.x, 1.1, object.position.z) )
		}
	})

	canvas.addEventListener("mousedown", ( e ) => {
		if ( e.button === 0 ) {
			state = STATE.ROTATE
		} else if ( event.button === 1 ) {
			state = STATE.ZOOM;
		} else if ( event.button === 2 ) {
			state = STATE.PAN;
		}

		pointerOld.set( e.offsetX, e.offsetY )

		canvas.addEventListener( 'mousemove', onMouseMove, false )
		window.addEventListener( 'mouseup', onMouseUp, false )
	})

	let onMouseUp = () => {
		canvas.removeEventListener( 'mousemove', onMouseMove, false )
		window.removeEventListener( 'mouseup', onMouseUp, false )
	}

	let onMouseMove = (e) => {
		pointer.set( e.offsetX, e.offsetY )

		let movementX = pointer.x - pointerOld.x
		let movementY = pointer.y - pointerOld.y

		if ( state === STATE.ROTATE ) {
			rotate( new THREE.Vector3( - movementX * 1, - movementY * 1, 0 ) )
		} else if ( state === STATE.PAN ) {
			pan( new THREE.Vector3( - movementX, movementY, 0 ) );
		} else if ( state === STATE.ZOOM ) {
			zoom( new THREE.Vector3( 0, 0, movementY ) );
		}

		pointerOld.set( e.offsetX, e.offsetY )

	}

	canvas.addEventListener( 'contextmenu', ( event ) => {
		event.preventDefault();
	}, false )

	let update_stack = []
	let clock = new THREE.Clock()
	clock.start()

	function render() {
		update_stack.forEach( e => e({clock, camera}) )
		renderer.render( scene, camera )
		requestAnimationFrame( render )
	}

	camera.position.y = 5
	camera.position.z = 30
	zoom( new THREE.Vector3( 0, 0, -800 ) )
	camera.lookAt( new THREE.Vector3() )

	render()

	return {scene, camera, renderer, update_stack}
}
