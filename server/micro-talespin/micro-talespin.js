//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-09T04:37:57+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const colors = require('colors')
const { verbose, getopt } = require('./utils.js')
const { goals } = require('./goals.js')

class Knowledge {
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

class Plan extends Array {
	constructor(e) {
		super()
	}

	get last() {
		let l = this[this.length - 1]
		if (!l || !l.next)
			return l
		else
			return l.next.last
	}

	clear() {
		return (this.reduce( (p, e) => {
			if (e.next && e.next.clear())
				e.next = undefined
			else
				return true
			return p
		}, false) )
	}

	erase({personae, actor, action, target}) {
		let goal = Object.keys(goals).reduce( (p, e) => {
			if (goals[e] == target)
				return e
			return p
		}, undefined)

		this.forEach( (e, i) => {
			if (e.target == goal) {
				this[i] = undefined
			}
		})
	}

	push(e) {
		if (e instanceof Array && !(e instanceof Plan)) {
			let _ = new Plan
			e.forEach( _e => _[_.length] = _e )
			e = _
		}
		if (Object.keys(this).length == 0)
			Array.prototype.push.call(this, e)
		else {
			this.forEach( _ => {
				if (!_.next && !(e instanceof Plan)) {
					_.next = new Plan()
					Array.prototype.push.call(_.next, e)
				}
				else if (!_.next && e instanceof Plan) {
					_.next = e
				}
				else
					_.next.push(e)
			})
		}
	}
}

class Personae {
	constructor(name) {
		this._name = name
		this._knowledge = {}
		this._plan = new Plan
	}

	knowledge({personae, actor, action, target}) {
		console.log('~knowledge'.cyan, personae, actor, action, target)
		console.log(this)
		if (this[action])
			return this[action]({personae, actor, action, target})
		else if (this._knowledge[actor])
			return JSON.stringify(this._knowledge[actor], null, "  ")
		else if (personae == this._name)
			return JSON.stringify(this._knowledge)
		else
			return JSON.stringify(this._knowledge)
	}
}

exports.Knowledge = Knowledge
exports.Plan = Plan
exports.Personae = Personae

exports.talesFactory = function talesFactory(mods) {
	let Tale = function Tale ({id, initFacts}) {
		this.id = id
		initFacts.forEach( e => {
			this.knows(e)
		})
	}
	Tale.prototype.constructor = Tale
	Tale.prototype.modsList = Object.keys(mods)
	Tale.prototype.mods = mods

	Object.keys(mods).forEach(k => {
		Tale.prototype[k] = mods[k]
	})
	return Tale
}

if (require.main === module) {
	let options = [
		[ [ "-h", "--help" ], "Display the current help screen", () => {
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
		} ],
		[ [ "--story" ], "Feed the game with a story.json", (opts, arg) => {
			opts["--story"] = arg
		} ]
	]
	let logo = require('fs').readFileSync('.ascii_logo').toString()
	let opts = getopt(options)

	let { load } = require('./utils.js')
	let ts = load()
	let _ = new ts({
		id: 0,
		initFacts: require('./' + opts['--story'] || './story0.json')
	})

	console.log(logo)
	_.run(opts)
}
