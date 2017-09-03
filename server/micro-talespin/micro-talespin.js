//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-03T03:36:57+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const colors = require('colors')
const { verbose, getopt } = require('./utils.js')

class Knowledge {
	constructor() {}
	keys() { return Object.keys(this) }
	forEach(f) {
		Object.keys(this).forEach( (k, i) => {
			f(this[k], i, this)
		})
	}
	filter(f) {
		return Object.keys(this).reduce( (p, k, i) => {
			if ( f(this[k], i, this, k) )
				p[k] = this[k]
			return p
		}, new Knowledge())
	}
}

exports.Knowledge = Knowledge

exports.talesFactory = function talesFactory(mods) {
	let Tale = function ({id, actors, personae, object, initFacts}) {
		this.id = id
		initFacts.forEach( e => {
			this.knows(e)
		})
		this.modsList = Object.keys(this.mods)
	}
	Tale.prototype.constructor = Tale

	Tale.prototype.mods = mods
	Object.keys(mods).forEach(k => {
		Tale.prototype[k] = mods[k]
	})
	return Tale
}

if (require.main === module) {
	let options = [
		[ [ "-h", "--help" ], "Display the current help screen", () => {
			console.log("./micro-talespin")
			options.forEach( t => {
				let opts = t[0].reduce((p, e) => p += `${e}, `, "")
				process.stdout.write(`${opts.match(/(.*)\,/)[1]}`)
				let i = opts.length
				while (i < 21) {
					process.stdout.write(` `)
					i += 1
				}
				console.log(`${t[1]}`)
			})
			process.exit(1)
		} ],
		[ [ "--interactif"], "Will prompt you every time.", (opts) => {
			opts["--interactif"] = true
		} ],
		[ [ "--sum", "--summary" ], "Display a summary at the end of a story run", (opts) => {
			opts["--summary"] = true
		} ],
		[ [ "-v", "--verbose" ], "Display a verbose output", (opts) => {
			opts["--verbose"] = true
		} ],
		[ [ "-s", "--sequence" ], "Stop the story run after N turns", (opts, arg) => {
			opts["--sequence"] = arg
		} ]
	]

	let opts = getopt(options)

	let { load } = require('./utils.js')
	let ts = load()
	let _ = new ts({
		id: 0,
		initFacts: require('./story0.json')
	})

	_.run(opts)
}
