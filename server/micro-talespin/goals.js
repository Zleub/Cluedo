//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-07T01:46:01+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-15T09:45:06+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

let {
	verbose,
	DictionaryFunctor
} = require('./utils.js')
const StringDictionary = DictionaryFunctor(String)

exports.goals = {
	'thirsty': 'water'
}

Object.keys(exports.goals).forEach(e => {
	let v = exports.goals[e]

	exports[e] = function({
		personae,
		actor,
		action,
		target
	}) {
		console.log(`~${e}`.blue, personae, actor, action, target)
		this.personae(personae)._plan.push({
			personae,
			actor,
			action: 'dcont',
			target: v
		})
	}

})
