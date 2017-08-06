//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-07T01:37:28+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const colors = require('colors')
const { verbose } = require('./utils.js')

exports.talesFactory = function talesFactory(mods) {
	let tale = function ({id, actors, personae, object, initFacts}) {
		this.id = id
		initFacts.forEach( e => {
			this.knows(e)
		})
		this.modsList = Object.keys(this.mods)
	}
	tale.prototype.constructor = tale

	tale.prototype.mods = mods
	Object.keys(mods).forEach(k => {
		tale.prototype[k] = mods[k]
	})
	return tale
}

if (require.main === module) {
	let { load } = require('./utils.js')
	let ts = load()
	let _ = new ts({
		id: 0,
		initFacts: require('./story0.json')
	})

	_.run()
}
