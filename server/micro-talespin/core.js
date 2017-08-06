//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-07T00:20:20+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

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

exports.find = function (o) {
	let found = Object.keys(this._personae).reduceRight( (p, e) => {
		let _k = this.personae(e)._knowledge
		Object.keys(_k).forEach(k => {
			let _ = Object.keys(_k[k])
			if ( e == k && _.find(e => o == e) && !(p.some( _ => _[0] == this.personae(e) ) ))
				p.push([this.personae(e), _k[k][o]])
		})
		return p
	}, [])

	return {
		forEach: (f) => {
			console.log(f)
			found.forEach( e => f(e[0], e[1]) )
		}
	}
}

exports.run = function () {
	verbose('run')
	console.log( this.find('location') )
	console.log( this.find('goal') )

	let solve = (personae, knowledge) => {
		verbose('->', personae, knowledge)
		knowledge.forEach( e => {
			if (!this[e])
				return console.warn(`${e} not implemented.`)
			this[e]({
				personae: personae.name,
				actor: personae.name,
				action: 'goal',
				target: e
			})
		})
	}

	this.find('goal').forEach(solve)
	this.find('goal').forEach(solve)

}
