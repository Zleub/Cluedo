//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-11T03:12:21+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { Knowledge } = require('./micro-talespin.js')
const { verbose } = require('./utils.js');

['personae', 'actor', 'target'].forEach( e => {
	exports[e] = function(name) {
		let _ = `_${e}`

		if (name.name) {
			return [ this[_][name.name] ]
		}
		else if (typeof name == 'object') {
			return Object.keys(this[_]).map( k => this[_][k])
		}

		if (!this[_])
			this[_] = {}
		if (!this[_][name])
			this[_][name] = { name }
		return this[_][name]
	}
})

exports.knows = function ({personae, actor, action, target}) {
	let p = this.personae(personae)

	if (!p._knowledge) {
		p._knowledge = {}
		p.knowledge = function ({personae, actor, action, target}) {
			console.log('~knowledge'.cyan, personae)
			if (p[action])
				return p[action]({personae, actor, action, target})
		}
	}
	if (!p._knowledge[actor])
		p._knowledge[actor] = new Knowledge()
	if (!action)
		return p._knowledge[actor]
	if (!target && !p._knowledge[actor][action])
		console.warn('warning: quering an undefined knowledge')
	if (!target)
		return p._knowledge[actor][action]

	if (p._knowledge[actor][action]
		&& p._knowledge[actor][action].some(e => e == target)) {
			// console.log(`fail ${personae}, ${actor}, ${action}, ${target}`.red)
			// console.log(p._knowledge[actor][action])
			return {personae, actor, action, target}
		}

	if (p._knowledge[actor][action])
		p._knowledge[actor][action].push(target)
	else {
		p._knowledge[actor][action] = [ target ]
		p[action] = function ({personae, actor, _action, target}) {
			console.log(`~${action}`.magenta)
			verbose({personae, actor, action, target})
			if (p._knowledge[target])
				return p._knowledge[target][action]
		}
	}
	let length = p._knowledge[actor][action].length - 1
	return p._knowledge[actor][action][length]
}
