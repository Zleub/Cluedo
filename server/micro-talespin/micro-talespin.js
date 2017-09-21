//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-21T23:24:08+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const colors = require('colors')

const {
	verbose,
	getopt,
	introspect,
	DictionaryFunctor,
	ArrayFunctor
} = require('./utils.js')

const {
	goals
} = require('./goals.js')

const { Knowledge } = require('./Knowledge.js')
const { Plan } = require('./Plan.js')
const { Personae } = require('./Personae.js')

exports.Knowledge = Knowledge
exports.Plan = Plan
exports.Personae = Personae

exports.talesFactory = function talesFactory(mods) {
	let Tale = function Tale({
		id,
		initFacts
	}) {
		this.id = id
		initFacts.forEach(e => {
			this.knows(e)
		})
	}
	Tale.prototype.constructor = Tale
	Tale.prototype.modsList = Object.keys(mods).map(k => k)
	Tale.prototype.mods = mods

	Tale.prototype.introspect = introspect

	Object.keys(mods).forEach(k => {
		Tale.prototype[k] = mods[k]
	})
	return Tale
}

if (require.main === module) {
	let options = [
		[
			[
				"-h", "--help"
			],
			"Display the current help screen",
			() => {
				options.forEach(t => {
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
			}
		],
		[
			["--interactif"], "Will prompt you every time.", (opts) => {
				opts["--interactif"] = true
			}
		],
		[
			[
				"--sum", "--summary"
			],
			"Display a summary at the end of a story run",
			(opts) => {
				opts["--summary"] = true
			}
		],
		[
			[
				"-v", "--verbose"
			],
			"Display a verbose output",
			(opts) => {
				opts["--verbose"] = true
			}
		],
		[
			[
				"-s", "--sequence"
			],
			"Stop the story run after N turns",
			(opts, arg) => {
				opts["--sequence"] = arg
			}
		],
		[
			["--story"],
			"Feed the game with a story.json",
			(opts, arg) => {
				opts["--story"] = arg
			}
		]
	]
	let logo = require('fs').readFileSync('.ascii_logo').toString()
	let opts = getopt(options)

	let {
		load
	} = require('./utils.js')
	let ts = load()
	let _ = new ts({
		id: 0,
		initFacts: require('./' + opts['--story'] || './story0.json')
	})

	console.log(logo)
	_.run(opts)
}
