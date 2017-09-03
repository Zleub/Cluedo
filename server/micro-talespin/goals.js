//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-07T01:46:01+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-03T04:15:06+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

exports.thirsty = function ({personae, actor, action, target}) {
	console.log('~thirsty'.blue, personae, actor, action, target)
	this.knows({personae, actor, action: 'dcont', target: 'water'})
}

// exports.hungry = function ({personae, actor, action, target}) {
// 	this.knows({personae, actor, action: 'dcont', target: 'daodpws'})
// }
