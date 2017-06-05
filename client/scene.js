canvas = document.querySelector('canvas')
scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 )

renderer = new THREE.WebGLRenderer({
	canvas: canvas
})

let geometry = new THREE.BoxGeometry( 1, 0.1, 1 )
let material = new THREE.MeshBasicMaterial( {
	color: 0xf5f5f5,
	// wireframe: true
} )

for (let i = -4.5; i < 5; i += 1)
	for (let j = -4.5; j < 5; j += 1) {
		let cube = new THREE.Mesh( geometry, material )
		cube.position.set( i, 0, j)
		scene.add( cube )
	}

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

window.addEventListener('wheel', ( event ) => {
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

function contextmenu( event ) {
	event.preventDefault();
}
window.addEventListener( 'contextmenu', contextmenu, false )

function render() {
	requestAnimationFrame( render )
	renderer.render( scene, camera )
}

camera.position.y = 2
camera.position.z = 10
zoom( new THREE.Vector3( 0, 0, -800 ) )
camera.lookAt( new THREE.Vector3() )

render()
