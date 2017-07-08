//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-23T20:30:08+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-06T17:50:54+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const crypto = require('crypto');

class Character {
	constructor(opt) {
		Object.keys(opt).forEach( k => {
			this[`_${k}`] = opt[k]
		})
	}

	id() {
		const hash = crypto.createHash('sha256');
		hash.update(this.name({}) + this._age);
		return hash.digest('hex');
	}

	name({name}) {
		let n = this._firstname + ' ' + this._lastname
		if (!name)
			return n
		if (n == name)
			return this
	}

	texture() {
		return this._texture
	}

	age() {
		return this._age
	}

	particularities({particularities}) {
		if (!particularities)
			return this._particularities
		if (particularities && this._particularities.filter(e => e == particularities).length != 0)
			return this
	}

	relationships({state}) {
		if (!state)
			return this._relationships
		if (state)
			return this._relationships.filter( e => e.state == state )
	}
}

module.exports = Character
