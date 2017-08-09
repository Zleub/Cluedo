//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-07T20:00:37+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const fs = require('fs')
const util = require('util');

const _usage = {
	'--verbose': 'this option is verbosity'
}

let usage = process.argv.reduce( (p, e) => {
	Object.keys(_usage).forEach( _ => {
		if (e == _)
			p[_] = true
	})
	return p
}, {})

exports.verbose = (...s) => {
	let _verbose = (e, i) => {
		process.stdout.write(util.inspect(e, {
			depth: null,
			colors: true
		}))
		if (i == s.length - 1)
			process.stdout.write("\n")
		else
			process.stdout.write("  ")
	}
	s.forEach(_verbose)
}

exports.load = () => {
	let { talesFactory } = require(`./micro-talespin.js`)
	let files = fs.readdirSync('./server/micro-talespin/')
	let data = files.reduce( (p, e) => {
		if (e != 'micro-talespin.js' && e.match(/.*\.js$/)) {
			let _ = require(`./${e}`)

			if (_.talesFactory)
				talesFactory = _.talesFactory
			Object.keys(_).forEach( k => {
				if (p[k])
					console.warn(`warning, erasing ${k}`)
				p[k] = _[k]
			})
		}
		return p
	}, {})

	return new talesFactory(data)
}
