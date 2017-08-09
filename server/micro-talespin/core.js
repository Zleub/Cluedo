//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-09T01:23:22+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const actions = require('./actions.js');
const { verbose } = require('./utils.js');

exports.run = function () {
	verbose('run')

	let _find = () => {
		return Object.keys(this._personae).reduce( (p, e) => {
			let _k = this.personae(e)._knowledge
			Object.keys(_k).reduceRight( ($, k) => {
				let _ = Object.keys(_k[k])
				_.reduceRight( (__, n) => {
					Object.keys(actions).forEach( a => {
						if (n == a && !(p.some(c => c.personae == e))) {
							p.push({
								personae: e,
								actor: e,
								action: a,
								target: _k[k][a]
							})
						}
					}, null)
				}, null)
			})
			return p
		}, [])
	}

	let found
	let i = 0
	do {
		console.log('---- ---- ---- ---- ---- ---- ---- ')
		found = _find()
		verbose(found)
		found.forEach( ({personae, actor, action, target}) => {
			target.forEach( _target => {
				if (this[action])
					this[action]({personae, actor, action, target})
				else
					console.log(`${action} not implemented`.red)
			})
		})
		i += 1
	} while (found.length != 0 && i < 4)

	console.log('---- ---- ---- END ---- ---- ---- ')
	verbose(this)
}
