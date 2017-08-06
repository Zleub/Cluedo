//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-07T01:19:09+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

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
	// console.log(this[action])
}
