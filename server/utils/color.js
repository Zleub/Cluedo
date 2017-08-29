//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-29T00:13:46+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-29T01:47:32+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

let Colors = {
	Modifier : [
		{ name: "RESET", code: 0 },
		{ name: "BOLD", code: 1 },
		{ name: "DIM", code: 2 },
		{ name: "ITALIC", code: 3},
		{ name: "UNDERLINE", code: 4 },
		{ name: "BLINK", code: 5 },
		{ name: "REVERSE", code: 7 },
		{ name: "HIDDEN", code: 8 },
		{ name: "NO_BOLD", code: 21 },
		{ name: "NO_DIM", code: 22 },
		{ name: "NO_UNDERLINE", code: 24 },
		{ name: "NO_BLINK", code: 25 },
		{ name: "NO_REVERSE", code: 27 },
		{ name: "NO_HIDDEN", code: 28 }
	],
	Foreground : [
		{ name: "DEFAULT", code: 39 },
		{ name: "BLACK", code: 30 },
		{ name: "RED", code: 31 },
		{ name: "GREEN", code: 32 },
		{ name: "YELLOW", code: 33 },
		{ name: "BLUE", code: 34 },
		{ name: "MAGENTA", code: 35 },
		{ name: "CYAN", code: 36 },
		{ name: "LIGHT_GRAY", code: 37 },
		{ name: "DARK_GRAY", code: 90 },
		{ name: "LIGHT_RED", code: 91 },
		{ name: "LIGHT_GREEN", code: 92 },
		{ name: "LIGHT_YELLOW", code: 93 },
		{ name: "LIGHT_BLUE", code: 94 },
		{ name: "LIGHT_MAGENTA", code: 95 },
		{ name: "LIGHT_CYAN", code: 96 },
		{ name: "WHITE", code: 97 }
	],
	Background : [
		{ name: "DEFAULT", code: 49 },
		{ name: "BLACK", code: 40 },
		{ name: "RED", code: 41 },
		{ name: "GREEN", code: 42 },
		{ name: "YELLOW", code: 43 },
		{ name: "BLUE", code: 44 },
		{ name: "MAGENTA", code: 45 },
		{ name: "CYAN", code: 46 },
		{ name: "LIGHT_GRAY", code: 47 },
		{ name: "DARK_GRAY", code: 100 },
		{ name: "LIGHT_RED", code: 101 },
		{ name: "LIGHT_GREEN", code: 102 },
		{ name: "LIGHT_YELLOW", code: 103 },
		{ name: "LIGHT_BLUE", code: 104 },
		{ name: "LIGHT_MAGENTA", code: 105 },
		{ name: "LIGHT_CYAN", code: 106 },
		{ name: "WHITE", code: 107 }
	]
}

let Color = function (name) {
	let _c = function () {
		if (arguments.length) {
			console.log(arguments)
			return _c.bind(this, ...arguments)
		}
	}
	Object.assign(_c, Color.prototype)
	return _c
}
Color.prototype.constructor = Color
Object.keys(Colors).forEach( k => {
	Color.prototype[k] = Colors[k].reduce( (p, c) => {
		p[c.name] = function () {
			return "\033[" + c.code + "m"
		}
		return p
	}, {})
})
Color.prototype.apply = function (name) {

}
Color.prototype.Foreground.Generic = function (code) {
	return "\033[38;5;" + code + "m"
}
Color.prototype.Background.Generic = function (code) {
	return "\033[48;5;" + code + "m"
}
Color.prototype.RESET = Color.prototype.Modifier.RESET


module.exports = { Color: new Color }
