//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-09-03T20:34:20+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-05T09:46:07+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

let {
	Personae,
	Knowledge,
	Plan,
	knows,
	verbose
} = require("./server/micro-talespin")

let tale = {
	personae: function() {
		return p
	}
}
let p = new Personae("Bob")

knows.call(tale, {
	personae: "Bob",
	actor: "Bob",
	action: "is_a",
	target: "bear"
})
knows.call(tale, {
	personae: "Bob",
	actor: "Bob",
	action: "food",
	target: "fish"
})
knows.call(tale, {
	personae: "Bob",
	actor: "Bob",
	action: "goal",
	target: "hungry"
})

verbose(p)
