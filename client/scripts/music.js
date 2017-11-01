let major = [ 2, 2, 1, 2, 2, 2, 1 ]
let penta = [ 2, 2, 3, 2, 3 ]
let minor = [ 2, 1, 2, 2, 1, 2, 2 ]

let orders = [
	[ 'I', 'II', 'III', 'IV', 'V7', 'VI', 'VII' ],
	[ 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii' ]
]
let get_order = (i) => orders.reduce( (p,e) => {
	if (p !== false)
		return p
	let index = e.findIndex(e => e == i)
	return (index == -1 ? false : index)
}, false)

let progressions = [
	// [ 'ii', 'V7', 'I' ]
	[ 'ii', 'V7', 'I' ],
	[ 'I', 'IV', 'V7' ],
	[ 'I', 'VI', 'II', 'V7' ]
]

let notes = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ]
let notes_to_i = Object.assign( notes.reduce( (p, e, i) => {
	p[i + 64] = e
	return p
}, {}), notes.reduce( (p, e, i) => {
	p[i + 64 + 12] = e
	return p
}, {}), notes.reduce( (p, e, i) => {
	p[i + 64 + 24] = e
	return p
}, {}) )

let test = (tone, scale, progression) => {
	let i = -1
	if (typeof tone == 'string')
		tone = notes.findIndex(e => e == tone) + 64

	let acc = 0
	let _scale = [tone].concat( scale.map( e => tone + (acc += e)) )
	let chords = []
	for (var __ = 0; __ < 7; __ += 1) {
		let c = []
		for (var _ = 0; _ < 6; _ += 2) {
			let a = (_ + __) % scale.length
			let b = (_ + __ + 1) % scale.length
			c.push( scale[a] + scale[b] )
		}
		chords.push(c)
	}

	console.log( _scale.map( e => notes_to_i[e] ) )

	return () => {
		i += 1
		let acc = 0
		let res = [_scale[ get_order(progression[i]) ]].concat( chords[ get_order(progression[i]) ].map( e => _scale[ get_order(progression[i]) ] + (acc += e)) )
		console.log(progression[i], '->', res.map( e => notes_to_i[e] ))
		return res
	}
}

// progressions.forEach( e => {
// 	console.log(`\n== ${e} ==\n`)
// 	console.log('C major')
// 	s = test('C', major, e)
// 	for (var i = 0; i < e.length; i++) {
// 		s()
// 	}
//
// 	console.log('G major')
// 	s = test('G', major, e)
// 	for (var i = 0; i < e.length; i++) {
// 		s()
// 	}
//
// 	console.log('C minor')
// 	s = test('C', minor, e)
// 	for (var i = 0; i < e.length; i++) {
// 		s()
// 	}
//
// 	console.log('C penta')
// 	s = test('C', penta, e)
// 	for (var i = 0; i < e.length; i++) {
// 		s()
// 	}
// })
