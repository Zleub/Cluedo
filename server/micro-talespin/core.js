//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-22T01:31:21+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const actions = require('./actions.js');
const { verbose } = require('./utils.js');
const { createInterface } = require('readline');

exports.run = function (opts) {
	let _find = () => {
		return Object.keys(this._personae).reduce( (p, e) => {
			let plan = this.personae(e)._plan.last
			if (plan)
				return p.concat([plan])
			return p
		}, [] )
	}

	let i = 0
	let _run = () => {
		found = _find()
		// verbose(found)
		found.forEach( ({personae, actor, action, target}) => {
			if (this[action]) {
				this[action]({personae, actor, action, target})
			}
			else
				console.log(`${action} not implemented`.red)
		})
		i += 1
		return found
	}

	let found
	if (opts["--interactif"]) {
		const rl = createInterface({
			input: process.stdin,
			output: process.stdout
		});

		let _ = () => {
			console.log('---- ---- ---- ---- ---- ---- ---- ')
			rl.question('Next ? ', (answer) => {
				if (answer != 'N') {
					_run(found)
					_()
				}
				else {
					rl.close()
					if (opts["--summary"]) {
						console.log('---- ---- ---- END ---- ---- ---- ')
						verbose(this)
					}
				}
			})
		}
		_()
	}
	else {
		do {
			if (opts['--verbose'])
				console.log('---- ---- ---- ---- ---- ---- ---- ')
			_run(found)
		} while (found.length != 0 && i < (opts["--sequence"] || 128))
		if (opts['--verbose'] && opts["--summary"]) {
			console.log('---- ---- ---- END ---- ---- ---- ')
			verbose(this)
		}
	}
}
