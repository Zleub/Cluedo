//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-10T06:29:12+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const fs = require('fs')
const util = require('util');

exports.getopt = (options) => {
	let opts = {}
	process.argv.forEach( (arg, i) => {
		options.forEach( t => {
			if (t[0].some(e => e == arg))
				t[2](opts, process.argv[i + 1])
		})
	})
	return opts
}

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
		if (e != 'index.js' && e != 'micro-talespin.js' && e.match(/.*\.js$/)) {
			delete require.cache[`./${e}`]
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

exports.DictionaryFunctor = (type) => {
	let _class = class extends Object {
		static get name() {
			return type.name + "Dictionary"
		}

		insert(k, v) {
			if (v.constructor.name != type.name)
				throw `No such type ${v.constructor.name} in ${this.name}`
			else
				this[k] = v
		}
	}
	return _class
}

exports.ArrayFunctor = (type) => {
	let _class = class extends Array {
		static get name() {
			return type.name + "Array"
		}

		push(v) {
			if (v.constructor.name != type.name)
				throw `No such type ${v.constructor.name} in ${this.name}`
			else
				Array.prototype.push.call(this, v)
		}
	}
	return _class
}
