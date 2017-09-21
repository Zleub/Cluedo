//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-09-13T00:10:58+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-15T11:37:34+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

let colors = require('colors')
let {
	introspect,
	load,
	verbose
} = require('./server/micro-talespin/utils.js')

let _ts = load()
let _ = new _ts({
	id: 0,
	initFacts: require("./server/micro-talespin/story0.json")
})


let tests = [{},
	{
		arnaud: 'arnaud'
	},
	['arnaud'],
	'arnaud',
	/dioajwd/,
	{
		'A': {
			'B': 'C'
		}
	},
	{
		'A': {
			'B': ['C', 'D']
		}
	},
	_,
	Math,
	new Date
]

tests.forEach(e => {
	let _e = e
	process.stdout.write(`${e.constructor.name.red} `)
	verbose(e)
	verbose(introspect.call(_e))
})
