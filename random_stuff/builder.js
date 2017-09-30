//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-09-23T00:51:05+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-27T22:07:23+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

require('colors')

console.log('tetriminitest')

let width = 3
let height = 3
let pieces = []
for (var n = 0; n < 8; n++) {
	let p = []
	for (var i = 0; i < width; i++) {
		p.push("")
		for (var j = 0; j < height; j++) {
			if (Math.random() < 0.2)
				p[i] += "."
			else
				p[i] += "#"
		}
	}

	pieces.push(p)
}


String.prototype.reduce = function (f, acc) {
	let _ = i => {
		acc = f(acc, this[i], i, this)
		if (i < this.length - 1)
			return _(i + 1)
		else
			return acc
	}
	return _(0)
}

String.prototype.forEach = function (f) {
	let _ = i => {
		f(this[i], i, this)
		if (i < this.length - 1)
			_(i + 1)
	}
	_(0)
}
String.prototype.map = function (f) {
	let res = ""
	let _ = i => {
		res += f(this[i], i, this)
		if (i < this.length - 1)
			_(i + 1)
	}
	_(0)
	return res
}

let printPiece = e => e.forEach( e => {
	for (var i = 0, len = e.length; i < len; i++) {
		process.stdout.write(((e[i] == '#') ? `${e[i]} `.green : `${e[i]} `.gray))
		if (i == e.length - 1)
			process.stdout.write('\n')
	}
})
let printPieces = (f) => {
	let _print = []
	let colorize = f || (p => p.map( e => (e == "#") ? "# ".magenta : `${e} `.grey))

	pieces.forEach( (p,n) => {
		p.forEach( (e,i) => {
			if (n == pieces.length - 1)
				_print[i] = (_print[i] || "") + colorize(e)
			else
				_print[i] = (_print[i] || "") + colorize(e) + " |  "
		})
	})
	_print.forEach(e => console.log(e))
}

// let solve = (x, y) => x + y
let pieceFunction = piece => (x_offset, y_offset) => piece.reduce( (p,e,y) => {
	let r = e.reduce( (p,e,x) => {
		return p + ((e.match('#')) ? (solve(x + x_offset, y + y_offset)) : 0)
	}, 0)
	return p + r
}, 0)
let printFunctionPieces = (x_offset, y_offset) => {
	let _print = []
	pieces.forEach( (piece,n) => {
		piece.forEach( (e, y) => {
			e.forEach( (e, x) => {
				_print[y] = _print[y] || ""
				if (e == '#')
					_print[y] += (solve(x + x_offset, y + y_offset)).toString().red
				else
					_print[y] += '0'.grey
				_print[y] += ' '
			})
			if (y < piece.length && n < pieces.length - 1)
				_print[y] += ' |  '
		})
		_print[4] = _print[4] || ""
		_print[4] += `${pieceFunction(piece)(x_offset, y_offset)}`
		for (var i = 0; i < 12 - `${pieceFunction(piece)(x_offset, y_offset)}`.length; i++) {
			_print[4] += ` `
		}
	})
	_print.forEach(e => console.log(e))
}

let greys = Object.keys(String.prototype).filter(e => e.match(/Grey\d/)).sort((a,b) => {
	return Number(a.match(/\d+/)) - Number(b.match(/\d+/))
} )

// solve = (x, y, x_offset, y_offset) => x + y
// printPieces()
// console.log('\n')
// printFunctionPieces()
// console.log('\n')

// solve = (x, y) => (x - y) ** 2
// solve = (x, y) => x
solve = (x, y) => (x * x) + (y * y)
printPieces()
console.log('\n')
printFunctionPieces(0, 0)
console.log('\n')

// solve = (x, y) => (x ** x) + (y ** y)
// printPieces()
// console.log('\n')
// printFunctionPieces()
// console.log('\n')
//
// solve = (x, y) => Math.round(Math.cos(x)) + Math.round(Math.sin(y))
// printPieces()
// console.log('\n')
// printFunctionPieces()
// console.log('\n')

let map_size = 20
let map = []
for (var i = 0; i < map_size; i++) {
	map[i] = []
	for (var j = 0; j < map_size; j++) {
		map[i][j] = "."
	}
}
let _empty = map

let write = (map, piece, x=0, y=0, color="") => {
	return map.map( (e, _y) => e.map( (e, _x) => {
		if (piece[_y - y] && piece[_y - y][_x - x] == "#") {
			if (color != "") {
				return "#"[color]
			}
			return piece[_y - y][_x - x]
		}
		else
			return e
	}) )
}

// solve = (x, y) => (x ** 2) + (y ** 2)
// map[0] = '............'
let print = map => {
	map.forEach( (e,y) => {
		e.forEach( (e,x) => process.stdout.write(e + " ") )
		process.stdout.write("\n")
	})
	console.log( pieceFunction(map)(0, 0) )
}
let show = map => {
	map.forEach( (e,y) => {
		e.forEach( (e,x) => process.stdout.write(((e.match("#")) ? solve(x, y) : e) + " ") )
		process.stdout.write("\n")
	})
	console.log( pieceFunction(map)(0, 0) )
}
let debug = map => {
	map.forEach( (e,y) => {
		e.forEach( (e,x) => process.stdout.write(solve(x, y) + " ") )
		process.stdout.write("\n")
	})
	console.log( pieceFunction(map)(0, 0) )
}

// print(write(_empty, pieces[0]))
// print(write(_empty, pieces[1]))
//
// map = write(_empty, pieces[0])
// map = write(map, pieces[1])
// print(map)
let colors = [
	"Black",
	"Maroon",
	"Green",
	"Olive",
	"Navy",
	"Purple",
	"Teal",
	"Silver",
	"Grey",
	"Red",
	"Lime",
	"Yellow",
	"Blue",
	"Fuchsia",
	"Aqua",
	"White",
	"Grey0",
	"NavyBlue",
	"DarkBlue",
	"Blue3",
	"Blue3",
	"Blue1",
	"DarkGreen",
	"DeepSkyBlue4",
	"DeepSkyBlue4",
	"DeepSkyBlue4",
	"DodgerBlue3",
	"DodgerBlue2",
	"Green4",
	"SpringGreen4",
	"Turquoise4",
	"DeepSkyBlue3",
	"DeepSkyBlue3",
	"DodgerBlue1",
	"Green3",
	"SpringGreen3",
	"DarkCyan",
	"LightSeaGreen",
	"DeepSkyBlue2",
	"DeepSkyBlue1",
	"Green3",
	"SpringGreen3",
	"SpringGreen2",
	"Cyan3",
	"DarkTurquoise",
	"Turquoise2",
	"Green1",
	"SpringGreen2",
	"SpringGreen1",
	"MediumSpringGreen",
	"Cyan2",
	"Cyan1",
	"DarkRed",
	"DeepPink4",
	"Purple4",
	"Purple4",
	"Purple3",
	"BlueViolet",
	"Orange4",
	"Grey37",
	"MediumPurple4",
	"SlateBlue3",
	"SlateBlue3",
	"RoyalBlue1",
	"Chartreuse4",
	"DarkSeaGreen4",
	"PaleTurquoise4",
	"SteelBlue",
	"SteelBlue3",
	"CornflowerBlue",
	"Chartreuse3",
	"DarkSeaGreen4",
	"CadetBlue",
	"CadetBlue",
	"SkyBlue3",
	"SteelBlue1",
	"Chartreuse3",
	"PaleGreen3",
	"SeaGreen3",
	"Aquamarine3",
	"MediumTurquoise",
	"SteelBlue1",
	"Chartreuse2",
	"SeaGreen2",
	"SeaGreen1",
	"SeaGreen1",
	"Aquamarine1",
	"DarkSlateGray2",
	"DarkRed",
	"DeepPink4",
	"DarkMagenta",
	"DarkMagenta",
	"DarkViolet",
	"Purple",
	"Orange4",
	"LightPink4",
	"Plum4",
	"MediumPurple3",
	"MediumPurple3",
	"SlateBlue1",
	"Yellow4",
	"Wheat4",
	"Grey53",
	"LightSlateGrey",
	"MediumPurple",
	"LightSlateBlue",
	"Yellow4",
	"DarkOliveGreen3",
	"DarkSeaGreen",
	"LightSkyBlue3",
	"LightSkyBlue3",
	"SkyBlue2",
	"Chartreuse2",
	"DarkOliveGreen3",
	"PaleGreen3",
	"DarkSeaGreen3",
	"DarkSlateGray3",
	"SkyBlue1",
	"Chartreuse1",
	"LightGreen",
	"LightGreen",
	"PaleGreen1",
	"Aquamarine1",
	"DarkSlateGray1",
	"Red3",
	"DeepPink4",
	"MediumVioletRed",
	"Magenta3",
	"DarkViolet",
	"Purple",
	"DarkOrange3",
	"IndianRed",
	"HotPink3",
	"MediumOrchid3",
	"MediumOrchid",
	"MediumPurple2",
	"DarkGoldenrod",
	"LightSalmon3",
	"RosyBrown",
	"Grey63",
	"MediumPurple2",
	"MediumPurple1",
	"Gold3",
	"DarkKhaki",
	"NavajoWhite3",
	"Grey69",
	"LightSteelBlue3",
	"LightSteelBlue",
	"Yellow3",
	"DarkOliveGreen3",
	"DarkSeaGreen3",
	"DarkSeaGreen2",
	"LightCyan3",
	"LightSkyBlue1",
	"GreenYellow",
	"DarkOliveGreen2",
	"PaleGreen1",
	"DarkSeaGreen2",
	"DarkSeaGreen1",
	"PaleTurquoise1",
	"Red3",
	"DeepPink3",
	"DeepPink3",
	"Magenta3",
	"Magenta3",
	"Magenta2",
	"DarkOrange3",
	"IndianRed",
	"HotPink3",
	"HotPink2",
	"Orchid",
	"MediumOrchid1",
	"Orange3",
	"LightSalmon3",
	"LightPink3",
	"Pink3",
	"Plum3",
	"Violet",
	"Gold3",
	"LightGoldenrod3",
	"Tan",
	"MistyRose3",
	"Thistle3",
	"Plum2",
	"Yellow3",
	"Khaki3",
	"LightGoldenrod2",
	"LightYellow3",
	"Grey84",
	"LightSteelBlue1",
	"Yellow2",
	"DarkOliveGreen1",
	"DarkOliveGreen1",
	"DarkSeaGreen1",
	"Honeydew2",
	"LightCyan1",
	"Red1",
	"DeepPink2",
	"DeepPink1",
	"DeepPink1",
	"Magenta2",
	"Magenta1",
	"OrangeRed1",
	"IndianRed1",
	"IndianRed1",
	"HotPink",
	"HotPink",
	"MediumOrchid1",
	"DarkOrange",
	"Salmon1",
	"LightCoral",
	"PaleVioletRed1",
	"Orchid2",
	"Orchid1",
	"Orange1",
	"SandyBrown",
	"LightSalmon1",
	"LightPink1",
	"Pink1",
	"Plum1",
	"Gold1",
	"LightGoldenrod2",
	"LightGoldenrod2",
	"NavajoWhite1",
	"MistyRose1",
	"Thistle1",
	"Yellow1",
	"LightGoldenrod1",
	"Khaki1",
	"Wheat1",
	"Cornsilk1",
	"Grey100",
	"Grey3",
	"Grey7",
	"Grey11",
	"Grey15",
	"Grey19",
	"Grey23",
	"Grey27",
	"Grey30",
	"Grey35",
	"Grey39",
	"Grey42",
	"Grey46",
	"Grey50",
	"Grey54",
	"Grey58",
	"Grey62",
	"Grey66",
	"Grey70",
	"Grey74",
	"Grey78",
	"Grey82",
	"Grey85",
	"Grey89",
	"Grey93"
]

let maps = []
for (var i = 0; i < pieces.length; i++) {
	map = _empty
	let res = 0
	pieces.forEach( (p, n) => {
		let __map = map
		let __ = [Infinity, __map]
		// for (var max = 1; max < map_size; max++) {

			for (var i = 0; i < map_size; i++) {
				for (var j = 0; j < map_size; j++) {
					let _map = map
					let r = res + pieceFunction(p)(j, i)
					map = write(map, p, j, i, colors[n % 15 + 1])

					if (r == pieceFunction(map)(0,0) && r < __[0]) {
						// console.log(`${j} ${i}: ${r} vs ${pieceFunction(map)(0,0)}`)
						res = r
						// return p
						__ = [r, map]
					}
					else {
						// console.log(`${j} ${i}: ${r} vs ${pieceFunction(map)(0,0)}`.grey)
						map = _map
						// __ = [r, _map]
					}
				}
			}
			// print(__[1])

		// }
		res = __[0]
		map = __[1]
		// process.exit()
	})
	// print(map)
	maps.push( [pieceFunction(map)(0,0), map] )
	let [e] = pieces.splice(0, 1)
	pieces.push(e)
}

maps.sort( ([a], [b]) => a - b )
for (var i = 0; i < 2; i++) {
	print(maps[i][1])
}
console.log('---- ---- ---- ----')
for (var i = maps.length - 3; i < maps.length - 1; i++) {
	print(maps[i][1])
}


// map = write(_empty, pieces[0])
// map = write(map, pieces[1], 0, 0)
// let A = pieceFunction(pieces[0])(0, 0)
// let B = pieceFunction(pieces[1])(0, 0)
// console.log(`${A} ${B} -> ${A + B}`)
// print(map)
// console.log('\n')
//
// map = write(_empty, pieces[0])
// map = write(map, pieces[1], 1, 0)
// A = pieceFunction(pieces[0])(0, 0)
// B = pieceFunction(pieces[1])(1, 0)
// console.log(`${A} ${B} -> ${A + B}`)
// print(map)
// console.log('\n')
//
// map = write(_empty, pieces[0])
// map = write(map, pieces[1], 2, 0)
// A = pieceFunction(pieces[0])(0, 0)
// B = pieceFunction(pieces[1])(2, 0)
// console.log(`${A} ${B} -> ${A + B}`)
// print(map)
// console.log('\n')
//
// map = write(_empty, pieces[0])
// map = write(map, pieces[1], 0, 1)
// A = pieceFunction(pieces[0])(0, 0)
// B = pieceFunction(pieces[1])(0, 1)
// console.log(`${A} ${B} -> ${A + B}`)
// print(map)
// console.log('\n')
//
// map = write(_empty, pieces[0])
// map = write(map, pieces[1], 0, 2)
// A = pieceFunction(pieces[0])(0, 0)
// B = pieceFunction(pieces[1])(0, 2)
// console.log(`${A} ${B} -> ${A + B}`)
// print(map)
// console.log('\n')
