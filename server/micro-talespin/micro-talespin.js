//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-28T00:20:55+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const colors = require('colors')
const { verbose } = require('./utils.js')

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
			if ( !f(this[k], i, this, k) )
				p[k] = this[k]
			return p
		}, new Knowledge())
	}
}

exports.Knowledge = Knowledge

exports.talesFactory = function talesFactory(mods) {
	let tale = function ({id, actors, personae, object, initFacts}) {
		this.id = id
		initFacts.forEach( e => {
			this.knows(e)
		})
		this.modsList = Object.keys(this.mods)
	}
	tale.prototype.constructor = tale

	tale.prototype.mods = mods
	Object.keys(mods).forEach(k => {
		tale.prototype[k] = mods[k]
	})
	return tale
}

if (require.main === module) {
	let options = [
		[ [ "--help", "-h" ], "Display the current help screen", () => {
			console.log("./micro-talespin")
			options.forEach( t => {
				let opts = t[0].reduce((p, e) => p += `${e} `, "")
				console.log(`${opts}:\t${t[1]}`)
			})
			process.exit(1)
		} ],
		[ [ "--interactif"], "Will prompt you every time.", (opts) => {
			opts["--interactif"] = true
		} ]
	]
	let getopt = (options) => {
		let opts = {}
		process.argv.forEach( arg => {
			options.forEach( t => {
				if (t[0].some( e => e == arg))
					t[2](opts)
				else
					opts[t[0]] = false
			})
		})
		return opts
	}
	let opts = getopt(options)

	let { load } = require('./utils.js')
	let ts = load()
	let _ = new ts({
		id: 0,
		initFacts: require('./story0.json')
	})

	_.run(opts)
}
