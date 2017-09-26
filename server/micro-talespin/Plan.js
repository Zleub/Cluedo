//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-09-21T23:21:19+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-22T01:30:50+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { goals } = require('./goals.js')

exports.Plan = class Plan extends Array {
	constructor(e) {
		super()
		// this.last = Plan.prototype.last.bind(this)
	}

	get last() {
		let l = this[this.length - 1]
		if (!l || !l.next)
			return l
		else
			return l.next.last
	}

	clear() {
		return (this.reduce((p, e) => {
			if (e.next && e.next.clear())
				e.next = undefined
			else
				return true
			return p
		}, false))
	}

	erase({
		personae,
		actor,
		action,
		target
	}) {
		let goal = Object.keys(goals).reduce((p, e) => {
			if (goals[e] == target)
				return e
			return p
		}, undefined)

		this.forEach((e, i) => {
			if (e.target == goal) {
				this[i] = undefined
			}
		})
	}

	push(e) {
		if (e instanceof Array && !(e instanceof Plan)) {
			let _ = new Plan
			e.forEach(_e => _[_.length] = _e)
			e = _
		}
		if (Object.keys(this).length == 0)
			Array.prototype.push.call(this, e)
		else {
			this.forEach(_ => {
				if (!_.next && !(e instanceof Plan)) {
					_.next = new Plan()
					Array.prototype.push.call(_.next, e)
				} else if (!_.next && e instanceof Plan) {
					_.next = e
				} else
					_.next.push(e)
			})
		}
	}
}
