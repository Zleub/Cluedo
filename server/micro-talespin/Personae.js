//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-09-21T23:21:49+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-22T01:26:06+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { Knowledge } = require('./Knowledge.js')
const { Plan } = require('./Plan.js')

exports.Personae = class Personae {
	constructor(name) {
		this._name = name
		this._knowledge = new Knowledge
		this._plan = new Plan
	}

	get name() {
		return this._name
	}

	knowledge({
		personae,
		actor,
		action,
		target
	}) {
		console.log('~knowledge'.cyan, personae, actor, action, target)
		if (this[action])
			return this[action]({
				personae,
				actor,
				action,
				target
			})
		else if (this._knowledge[actor])
			return JSON.stringify(this._knowledge[actor], null, "  ")
		else if (personae == this._name)
			return JSON.stringify(this._knowledge)
		else
			return JSON.stringify(this._knowledge)
	}
}
