//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-09-23T00:51:05+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-23T02:05:46+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

require('colors')

console.log('tetriminitest')

let pieceWidth = 4
let pieceHeight = 4
let pieces = [
	[ "#...", "##..", ".#..", "...." ],
	[ "#...", "#...", "##..", "...." ],
	[ "#...", "#...", "#...", "#..." ],
	[ "##..", "##..", "....", "...." ],
]

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

let printPiece = e => e.forEach( e => {
	for (var i = 0, len = e.length; i < len; i++) {
		process.stdout.write(((e[i] == '#') ? `${e[i]} `.green : `${e[i]} `.gray))
		if (i == pieceWidth - 1)
			process.stdout.write('\n')
	}
})
let printPieces = () => pieces.forEach(printPiece)

printPieces()

// let solve = (x, y, x_offset, y_offset) => (x + x_offset) + (y + y_offset)
let solve = (x, y, x_offset, y_offset) => (x + x_offset) + (y + y_offset)
let pieceFunction = piece => (x_offset, y_offset) => piece.reduce( (p,e,y) => {
	let r = e.reduce( (p,e,x) => {
		return p + ((e == '#') ? (solve(x, y, x_offset, y_offset)) : 0)
	}, 0)
	return p + r
}, 0)
let printFunctionPiece = piece => (x_offset, y_offset) => piece.forEach( (e, y) => {
	e.forEach( (e, x) => {
		if (e == '#')
			process.stdout.write((solve(x, y, x_offset, y_offset)).toString().red)
		else
			process.stdout.write('0'.grey)
		process.stdout.write(' ')
		if (x == pieceWidth - 1)
			process.stdout.write('\n')
	})
})
pieces.forEach( e => {
	console.log(pieceFunction(e)(0, 0))
	printFunctionPiece(e)(0, 0)
	console.log(pieceFunction(e)(0, 2))
	printFunctionPiece(e)(0, 2)
})
for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		process.stdout.write( (solve(j, i, 0, 0) < 10) ? `${solve(j, i, 0, 0)}  ` : `${solve(j, i, 0, 0)} ` )
		if (j == 8)
			process.stdout.write('\n')
	}
}

let greys = Object.keys(String.prototype).filter(e => e.match(/Grey\d/)).sort((a,b) => {
	return Number(a.match(/\d+/)) - Number(b.match(/\d+/))
} )

console.log(`nb greys: ${greys.length}`)
solve = (x, y, x_offset, y_offset) => x + y
pieces.forEach( e => {
	console.log(pieceFunction(e)(0, 0))
	printFunctionPiece(e)(0, 0)
	console.log(pieceFunction(e)(0, 2))
	printFunctionPiece(e)(0, 2)
})

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		if (greys[solve(j, i, 0, 0)])
			process.stdout.write( ((solve(j, i, 0, 0) < 10) ? `${solve(j, i, 0, 0)}  ` : `${solve(j, i, 0, 0)} `)[greys[solve(j, i, 0, 0)]] )
		else
			process.stdout.write( ((solve(j, i, 0, 0) < 10) ? `${solve(j, i, 0, 0)}  ` : `${solve(j, i, 0, 0)} `) )
		if (j == 8)
			process.stdout.write('\n')
	}
}

let sect = (Math.PI * 2) / 360
solve = (x, y, x_offset, y_offset) => (x * x) * (y * y)
for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		if (greys[solve(j, i, 0, 0)])
			process.stdout.write( ((solve(j, i, 0, 0) < 10) ? `${solve(j, i, 0, 0)}  ` : `${solve(j, i, 0, 0)} `))//[greys[solve(j, i, 0, 0)]] )
		else
			process.stdout.write( ((solve(j, i, 0, 0) < 10) ? `${solve(j, i, 0, 0)}  ` : `${solve(j, i, 0, 0)} `))//.black )
		if (j == 8)
			process.stdout.write('\n')
	}
}
