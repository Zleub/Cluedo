//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-22T21:27:43+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-22T21:31:56+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const assert = require('assert');

module.exports = () => {
	const generate = require('./server/routes/generate.js')
	generate.get.call({
		res : {
			end: function (message) {
				assert.strictEqual(message, "Hello get !\n")
			}
		}
	})
}
