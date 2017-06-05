let ratio = 1 / 32
let pieces = {}

pieces.head = {
	size: {
		height: 8 * ratio,
		width: 8 * ratio,
		depth: 8 * ratio
	}
}
// pieces.helmet = {
// 	size: {
// 		height: 9 * ratio,
// 		width: 9 * ratio,
// 		depth: 9 * ratio
// 	}
// }
pieces.body = {
	size: {
		height: 12 * ratio,
		width: 8 * ratio,
		depth: 4 * ratio
	}
}
pieces.left_leg = {
	size: {
		height: 12 * ratio,
		width: 4 * ratio,
		depth: 4 * ratio
	}
}
pieces.right_leg = {
	size: {
		height: 12 * ratio,
		width: 4 * ratio,
		depth: 4 * ratio
	}
}
pieces.left_arm = {
	size: {
		height: 12 * ratio,
		width: 4 * ratio,
		depth: 4 * ratio
	}
}
pieces.right_arm = {
	size: {
		height: 12 * ratio,
		width: 4 * ratio,
		depth: 4 * ratio
	}
}

pieces.head.position = {
	x: 0,
	y: pieces.body.size.height - 2 / 32,
	z: 0
}
// pieces.helmet.position = {
// 	x: 0,
// 	y: pieces.body.size.height / 1.15,
// 	z: 0
// }
pieces.body.position = {
	x: 0,
	y: 0,
	z: 0
}
pieces.left_leg.position = {
	x: pieces.body.size.width / 4,
	y: - pieces.body.size.height,
	z: 0
}
pieces.right_leg.position = {
	x: - pieces.body.size.width / 4,
	y: - pieces.body.size.height,
	z: 0
}
pieces.left_arm.position = {
	x: pieces.body.size.width - 2 / 32,
	y: 0,
	z: 0
}
pieces.right_arm.position = {
	x: -pieces.body.size.width + 2 / 32,
	y: 0,
	z: 0
}

pieces.head.map = [
	[ {x: 16, y: 24}, {x: 16, y: 16}, {x: 24, y: 24}, {x: 24, y: 16} ],
	[ {x:  0, y: 24}, {x:  0, y: 16}, {x:  8, y: 24}, {x:  8, y: 16} ],
	[ {x:  8, y: 32}, {x:  8, y: 24}, {x: 16, y: 32}, {x: 16, y: 24} ],
	[ {x: 16, y: 24}, {x: 16, y: 32}, {x: 24, y: 24}, {x: 24, y: 32} ],
	[ {x:  8, y: 24}, {x:  8, y: 16}, {x: 16, y: 24}, {x: 16, y: 16} ],
	[ {x: 24, y: 24}, {x: 24, y: 16}, {x: 32, y: 24}, {x: 32, y: 16} ]
]
pieces.body.map = [
	[ {x: 28, y: 12}, {x: 28, y:  0}, {x: 32, y: 12}, {x: 32, y:  0} ],
	[ {x: 16, y: 12}, {x: 16, y:  0}, {x: 20, y: 12}, {x: 20, y:  0} ],
	[ {x: 20, y: 16}, {x: 20, y: 12}, {x: 28, y: 16}, {x: 28, y: 12} ],
	[ {x: 28, y: 16}, {x: 28, y: 12}, {x: 36, y: 16}, {x: 36, y: 12} ],
	[ {x: 20, y: 12}, {x: 20, y:  0}, {x: 28, y: 12}, {x: 28, y:  0} ],
	[ {x: 32, y: 12}, {x: 32, y:  0}, {x: 40, y: 12}, {x: 40, y:  0}]
]

pieces.left_leg.map = [
	[ {x:  4, y: 12}, {x:  4, y:  0}, {x:  0, y: 12}, {x:  0, y:  0} ],
	[ {x: 12, y: 12}, {x: 12, y:  0}, {x:  8, y: 12}, {x:  8, y:  0} ],
	[ {x:  8, y: 16}, {x:  8, y: 12}, {x:  4, y: 16}, {x:  4, y: 12} ],
	[ {x: 12, y: 16}, {x: 12, y: 12}, {x:  8, y: 16}, {x:  8, y: 12} ],
	[ {x:  8, y: 12}, {x:  8, y:  0}, {x:  4, y: 12}, {x:  4, y:  0} ],
	[ {x: 16, y: 12}, {x: 16, y:  0}, {x: 12, y: 12}, {x: 12, y:  0} ]
]
pieces.right_leg.map = [
	[ {x:  8, y: 12}, {x:  8, y:  0}, {x: 12, y: 12}, {x: 12, y:  0} ],
	[ {x:  0, y: 12}, {x:  0, y:  0}, {x:  4, y: 12}, {x:  4, y:  0} ],
	[ {x:  4, y: 16}, {x:  4, y: 12}, {x:  8, y: 16}, {x:  8, y: 12} ],
	[ {x:  8, y: 16}, {x:  8, y: 12}, {x: 12, y: 16}, {x: 12, y: 12} ],
	[ {x:  4, y: 12}, {x:  4, y:  0}, {x:  8, y: 12}, {x:  8, y:  0} ],
	[ {x: 12, y: 12}, {x: 12, y:  0}, {x: 16, y: 12}, {x: 16, y:  0} ]
]
pieces.left_arm.map = [
	[ {x: 44, y: 12}, {x: 44, y:  0}, {x: 40, y: 12}, {x: 40, y:  0} ],
	[ {x: 52, y: 12}, {x: 52, y:  0}, {x: 48, y: 12}, {x: 48, y:  0} ],
	[ {x: 48, y: 16}, {x: 48, y: 12}, {x: 44, y: 16}, {x: 44, y: 12} ],
	[ {x: 52, y: 12}, {x: 52, y: 16}, {x: 48, y: 12}, {x: 48, y: 16} ],
	[ {x: 48, y: 12}, {x: 48, y:  0}, {x: 44, y: 12}, {x: 44, y:  0} ],
	[ {x: 56, y: 12}, {x: 56, y:  0}, {x: 52, y: 12}, {x: 52, y:  0} ],
]
pieces.right_arm.map = [
	[ {x: 48, y: 12}, {x: 48, y:  0}, {x: 52, y: 12}, {x: 52, y:  0} ],
	[ {x: 40, y: 12}, {x: 40, y:  0}, {x: 44, y: 12}, {x: 44, y:  0} ],
	[ {x: 44, y: 16}, {x: 44, y: 12}, {x: 48, y: 16}, {x: 48, y: 12} ],
	[ {x: 48, y: 12}, {x: 48, y: 16}, {x: 52, y: 12}, {x: 52, y: 16} ],
	[ {x: 44, y: 12}, {x: 44, y:  0}, {x: 48, y: 12}, {x: 48, y:  0} ],
	[ {x: 52, y: 12}, {x: 52, y:  0}, {x: 56, y: 12}, {x: 56, y:  0} ],
]


let tTexture = new THREE.TextureLoader().load( "redheadphones.png" )
tTexture.magFilter	= THREE.NearestFilter;
tTexture.minFilter	= THREE.NearestFilter;
let tMaterial = new THREE.MeshBasicMaterial({
	map: tTexture
})
let tMaterialt	= new THREE.MeshBasicMaterial({
	map: tTexture,
	transparent: true,
	side: THREE.DoubleSide
})

character = new THREE.Object3D()

let applyUV = (map, cube) => {
	map.forEach( (e, i) => {
		cube.geometry.faceVertexUvs[0][i * 2][0].x = e[0].x * 1 / 64
		cube.geometry.faceVertexUvs[0][i * 2][0].y = e[0].y * 1 / 32
		cube.geometry.faceVertexUvs[0][i * 2][1].x = e[1].x * 1 / 64
		cube.geometry.faceVertexUvs[0][i * 2][1].y = e[1].y * 1 / 32
		cube.geometry.faceVertexUvs[0][i * 2][2].x = e[2].x * 1 / 64
		cube.geometry.faceVertexUvs[0][i * 2][2].y = e[2].y * 1 / 32

		cube.geometry.faceVertexUvs[0][i * 2 + 1][0].x = e[1].x * 1 / 64
		cube.geometry.faceVertexUvs[0][i * 2 + 1][0].y = e[1].y * 1 / 32
		cube.geometry.faceVertexUvs[0][i * 2 + 1][1].x = e[3].x * 1 / 64
		cube.geometry.faceVertexUvs[0][i * 2 + 1][1].y = e[3].y * 1 / 32
		cube.geometry.faceVertexUvs[0][i * 2 + 1][2].x = e[2].x * 1 / 64
		cube.geometry.faceVertexUvs[0][i * 2 + 1][2].y = e[2].y * 1 / 32
	})
}

Object.keys(pieces).forEach( k => {
	let v = pieces[k]

	let geometry = new THREE.BoxGeometry( v.size.width, v.size.height, v.size.depth )
	let material = new THREE.MeshBasicMaterial( {
		color: 0xf50000,
		wireframe: true
	} )

	let cube = new THREE.Mesh( geometry, material )
	if (v.map) {
		cube = new THREE.Mesh( geometry, tMaterial )
		applyUV(v.map, cube)
	}

	cube.position.set(v.position.x, v.position.y, v.position.z)
	character.add(cube)
})

// window.onload = function() {
//   let gui = new dat.GUI();
//   let cube = character.children[0]
//   let uvs = pieces[Object.keys(pieces)[0]].map
//
//   uvs.forEach( (e, i) => {
// 	  var f = gui.addFolder(`${i}`)
// 	  e.forEach( (_e, _i) => {
// 		var _f = f.addFolder(`${_i}`)
// 		let change = () => {
// 			applyUV(uvs, cube)
// 			cube.geometry.uvsNeedUpdate = true
// 			document.querySelector('.res').innerText = JSON.stringify( uvs )
// 		}
//
// 	    _f.add(_e, 'x', 0, 64).onChange(change);
// 	    _f.add(_e, 'y', 0, 32).onChange(change);
//
// 	  })
//   })
// };

character.position.set(0, 0.615, 0)
scene.add(character)
