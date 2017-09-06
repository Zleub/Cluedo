//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-06T06:30:03+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { Knowledge, Personae } = require('./micro-talespin.js')
const { verbose } = require('./utils.js');

['personae', 'actor', 'target'].forEach( e => {
	exports[e] = function(name) {
		let _ = `_${e}`

		if (!this[_])
			this[_] = {}
		if (!this[_][name]) {
			this[_][name] = new Personae(name)
		}
		return this[_][name]
	}
})

exports.knows = function ({personae, actor, action, target}) {
	let p = this.personae(personae)

	if (!p._knowledge[actor]) {
		p._knowledge[actor] = new Knowledge()
	}
	if (!action)
		return p._knowledge[actor]
	if (!target && !p._knowledge[actor][action])
		console.warn('warning'.red + ': quering an undefined knowledge')
	if (!target)
		return p._knowledge[actor][action]

	if (p._knowledge[actor][action] && p._knowledge[actor][action].some(e => e == target)) {
		console.log(`already defined ${personae}, ${actor}, ${action}, ${target}`.red)
		return {personae, actor, action, target}
	}

	if (p._knowledge[actor][action])
		p._knowledge[actor][action].push(target)
	else {
		p._knowledge[actor][action] = [ target ]
		p[action] = function ({personae, actor, action: _action, target}) {
			console.log(`~${action}`.magenta, personae, actor, _action, target)
			// verbose('query', personae, actor, _action, target)
			if (!target) {
				return p._knowledge[actor][action]
			}

			if (p._knowledge[target] && p._knowledge[target][action])
				return p._knowledge[target][action]
		}
	}

	if (action == 'goal')
		p._plan.push({ personae, actor, action, target })

	let length = p._knowledge[actor][action].length - 1
	return p._knowledge[actor][action][length]

}
