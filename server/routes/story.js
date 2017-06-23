//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-20T20:59:09+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-23T18:12:56+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

exports.get = function () {
	this.res.end("Hello story get !\n")
}

exports.post = function () {
	this.res.end("Hello story post !\n")
}

exports['/generate'] = {
	get: function () {
		this.res.end("Hello story/generate get !\n")
	}
}

exports['/:param'] = {
	get: function (param) {
		this.res.end(`Hello story/param <${param}> get !\n`)
	},

	"/adebray": {
		get: function (param) {
			this.res.end(`Hello story/:param/adebray <${param}> get !\n`)
		}
	},

	"/:more_param": {
		get: function (param, more_param) {
			this.res.end(`Hello story/more_param <${param}> <${more_param}> get !\n`)
		}
	}
}
