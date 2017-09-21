//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-22T01:29:14+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { verbose } = require('./utils.js');

exports.goal = function ({personae, actor, action, target}) {
	console.log('~goal'.blue, personae, actor, action, target)
	if (this[target])
		this[target]({
			personae: personae,
			actor: personae,
			action: 'goal',
			target: target
		})
	else
		console.log(`${target} not implemented`.red)
}

exports.dcont = function ({personae, actor, action, target}) {
	console.log('~dcont'.blue, personae, actor, action, target)
	let k = this.personae(personae).knowledge({personae, actor, action: 'location', target})
	let _current = this.personae(personae).knowledge({ personae, actor, action: 'location' })

	if (k && !k.find(e => e == _current[0])) {
		this.personae(personae)._plan.push( k.reduce( (p, e) => {
			console.log('dcont -> dprox', e)
			p.push({personae, actor, action: 'dprox', target: e})
			return p
		}, []) )
	}
	else if (k.find(e => e == _current[0])){
		this.knows({personae, actor, action: 'owns', target})
		this.personae(personae)._plan.push({personae, actor, action: 'ingest', target})
	}
}

exports.dprox = function ({personae, actor, action, target}) {
	console.log('~dprox'.blue, personae, actor, action, target)
	if (this.personae(personae)._knowledge[actor]['location'].find( e => e == target[0])) {
		return
	}

	this.personae(personae)._knowledge[actor]['location'] = []
	this.knows({personae, actor, action: 'location', target: target})

	let _k = this.personae(personae)._knowledge[actor]
	// this.personae(personae)._knowledge[actor] = Object.keys(_k).reduce( (p, e) => {
	// 	if (e != action)
	// 		p[e] = _k[e]
	// 	return p
	// }, {})
	// console.log(action, target)
	this.personae(personae)._knowledge[actor] = _k.filter((e, i, o, k) => {
		return !(action == k && target == e)
	})
	this.personae(personae)._plan.clear()
}

exports.ingest = function ({personae, actor, action, target}) {
	console.log('~ingest'.blue, personae, actor, action, target)
	this.personae(personae)._plan.erase({personae, actor, action: 'dcont', target})
	this.personae(personae)._knowledge.erase({personae, actor, action: 'goal', target: 'thirsty'})
}
