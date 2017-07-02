//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-22T21:28:21+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-02T22:19:39+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const Story = require('../scripts/story.js')

process.stories = []
for (var i = 0; i < 2; i++) {
	let s = new Story(5)
	process.stories.push( s )
	s.id = i
}

exports.get = function () {
	let s = new Story(5)
	if (!process.stories)
		process.stories = [ s ]
	else
		process.stories.push( s )
	s.id = process.stories.length - 1

	this.res.end(JSON.stringify({
		id: (process.stories.length - 1).toString(),
	}))
}
