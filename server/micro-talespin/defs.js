//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-06T23:38:06+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

// exports

exports.knows = function ({personae, actor, action, target}) {
	let p = this.personae(personae)

	if (!p._knowledge) {
		p._knowledge = {}
		// p.knowledge = function (name) {
		// 	if (this._knowledge[name.name])
		// 		if (!name.mod)
		// 			return Object.keys(this._knowledge[name.name]).map( k => k + ": " + this._knowledge[name.name][k])
		// 		return [ this._knowledge[name.name][name.mod] ]
		// }
	}
	if (!p._knowledge[actor])
		p._knowledge[actor] = {}
	if (!action)
		return p._knowledge[actor]
	if (!target && !p._knowledge[actor][action])
		console.warn('warning: quering an undefined knowledge')
	if (!target)
		return p._knowledge[actor][action]

	if (p._knowledge[actor][action])
		p._knowledge[actor][action].push(target)
	else
		p._knowledge[actor][action] = [ target ]
	console.log(this[action])
}

exports.thirsty = function ({personae, actor, action, target}) {
	console.log({personae, actor, action, target})
	this.knows({personae, actor, action: 'dcont', target: 'water'})
}
