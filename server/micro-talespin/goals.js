//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-07T01:46:01+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-07T01:46:08+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

exports.thirsty = function ({personae, actor, action, target}) {
	if (this.personae(personae)._knowledge[actor]['dcont']
		&& this.personae(personae)._knowledge[actor]['dcont'].some(e => e == 'water'))
		return
	this.knows({personae, actor, action: 'dcont', target: 'water'})
}
