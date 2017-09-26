//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-09-21T23:19:54+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-22T01:28:56+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

exports.Knowledge = class Knowledge {
	keys() {
		return Object.keys(this)
	}
	forEach(f) {
		Object.keys(this).forEach((k, i) => {
			f(this[k], i, this)
		})
	}
	filter(f) {
		return Object.keys(this).reduce((p, k, i) => {
			if (f(this[k], i, this, k))
				p[k] = this[k]
			return p
		}, new Knowledge())
	}
	erase({personae, actor, action, target}) {
		this[actor][action] = this[actor][action].reduce( (p, e) => {
			if (e != target)
				p.push(e)
			return p
		}, [])
	}
}
