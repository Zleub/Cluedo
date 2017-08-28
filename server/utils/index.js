//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-10T01:16:18+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-11T02:38:41+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

let files = fs.readdirSync(__dirname)
files.forEach( (e) => {
	if (e != 'index.js' && e.match(/.*\.js$/)) {
		let _ = require(`./${e}`)
		let name = e.match(/(.*)\.js$/)[1]
		Object.keys(_).forEach( k => global[name].prototype[k] = _[k])
	}
})
