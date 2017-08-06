//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-07T01:52:52+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const actions = require('./actions.js');
const { verbose } = require('./utils.js');

exports.find = function ({personae, actor, action, target}) {
	verbose(action)
	let found = Object.keys(this._personae).reduceRight( (p, e) => {
		let _k = this.personae(e)._knowledge
		Object.keys(_k).forEach(k => {
			let _ = Object.keys(_k[k])
			if (e == k && _.find(e => action == e) && !(p.some( _ => _[0] == this.personae(e) ) ))
				p.push([this.personae(e), _k[k][action]])
		})
		return p
	}, [])

	return {
		forEach: (f) => f != undefined ? found.forEach( e => f.call(this, e[0], e[1]) ) : console.log(`undefined action: ${action}`.red)
	}
}
exports.run = function () {
	verbose('run')

	verbose(Object.keys(actions))

	this.find({ action: 'goal' }).forEach( this['goal'] )
	console.log('---- ---- ---- ---- ---- ---- ---- ---- ')
	this.find({ action: 'dcont' }).forEach( this['dcont'] )
	verbose(this.personae('Joe')._knowledge)

}
