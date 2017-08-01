//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-20T20:32:05+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-20T20:40:18+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

exports.get = function () {
	delete require.cache['../micro-talespin/micro-talespin.js']
	let { ts } = require('../micro-talespin/micro-talespin.js')

	let _ = new ts({
		id: 0,
		verbose: true,
		goals: [
			'hunger',
			'thirsty'
		],
		actors: [
			'World',
			'Joe',
			'Irving'
		],
		personae: [
			'Joe',
			'Irving'
		],
		object: [
			'water',
			'honey',
			'worm',
			'fish'
		],
		initFacts: [
			{
				personae: 'Joe',
				actor: 'Joe',
				action: 'location',
				target: 'cave'
			},
			// function () { this["location"](this, 'Joe', 'Joe', 'cave') },
			// function () { this["location"](this, 'World', 'Joe', 'cave') },
			// function () { this["location"](this, 'Irving', 'Joe', 'cave') },
			//
			// function () { this["location"](this, 'Irving', 'Irving', 'oak tree') },
			// function () { this["location"](this, 'World', 'Irving', 'oak tree') },
			// function () { this["location"](this, 'Joe', 'Irving', 'oak tree') },
			//

			{
				personae: 'World',
				actor: 'water',
				action: 'location',
				target: 'river'
			}
			// function () { this["location"](this, 'World', 'water', 'river') },
			// // function () { this["location"](this, 'Joe', 'water', 'river') },
			// function () { this["location"](this, 'World', 'honey', 'elm tree') },
			// function () { this["location"](this, 'Irving', 'honey', 'elm tree') },
			// function () { this["location"](this, 'World', 'worm', 'ground') },
			// function () { this["location"](this, 'Joe', 'worm', 'ground') },
			// function () { this["location"](this, 'World', 'fish', 'river') },
			// function () { this["location"](this, 'Irving', 'fish', 'river') },
			//
			// function () { this["is-a"](this, 'Joe', 'bear') },
			// function () { this["home"](this, 'Joe', 'cave') },
			//
			// function () { this["is-a"](this, 'Irving', 'bird') },
			// function () { this["home"](this, 'Irving', 'oak tree') },
			//
			// function () { this["food"](this, 'bear', ['honey', 'berries', 'fish']) },
			// function () { this["food"](this, 'bird', 'worm') },
			//
			// function () { this["goal"](this, 'Joe', 'thirsty') }
		]
	})

	this.res.end(JSON.stringify(_, null, "  "))
}
