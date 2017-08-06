//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-07T01:53:44+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { verbose } = require('./utils.js');

exports.goal = function (personae, knowledge) {
	verbose(personae, knowledge)
	knowledge.forEach( e => {
		verbose(e)
		if (!this[e])
			return console.warn(`${e} not implemented.`)
		this[e]({
			personae: personae.name,
			actor: personae.name,
			action: 'goal',
			target: e
		})
	})
}

exports.dcont = function () {
	console.log('~dcont'.blue)
}

// exports.actions = []
// exports.actions = [
// 	{
// 		name: 'dcont',
// 		text: {
// 			personae: 'want to acquire'
// 		},
// 		function: function (tale, actor, object) {
// 			tale.verbose('dcont'.inverse)
// 			if (tale.have(actor, object))
// 				return tale.verbose(`${actor} already have the ${object}.`.red)
// 			if (!tale[actor].stack || !tale[actor].stack.some(e => e.actor == actor && e.data == object)) {
// 				tale.verbose(`${actor} -> ${object}`)
// 				let k = { actor, action: this, data: object }
// 				return tale[actor].stack ? tale[actor].stack.push(k) : tale[actor].stack = [k]
// 			}
// 		},
// 		functionConsequence : function (tale, personae, goal) {
// 			tale.verbose('dcont consequence')
// 			tale.verbose(`${personae} -> ${goal.data}`)
// 			// let {data} = tale[personae].facts.find( e => e.actor == goal.data )
// 			let fact = tale[personae].facts.find( e => e.actor == goal.data )
// 			if (fact) {
// 				let {data} = fact
// 				if (tale[personae].stack && tale[personae].stack.some(e => e.personae == personae && e.actor == personae && e.action == 'dprox' && e.data == data))
// 				return tale.verbose(`${actor} already have a plan to acquire ${goal.data}.`.red)
//
// 				tale.verbose(`${personae} -> ${data}`)
// 				tale.mods.find(e => e.name == 'dprox').function(tale, personae, data)
// 			}
// 			else {
// 				tale.verbose(`Find out someone who know where ${goal.data} is.`)
// 				let k = { personae, action: "dknow", data: goal.data }
// 				return tale[personae].stack ? tale[personae].stack.push(k) : tale[personae].stack = [k]
// 			}
// 		}
// 	},
// 	{
// 		name: 'dprox',
// 		text: {
// 			personae: 'want to move'
// 		},
// 		function: function (tale, actor, object) {
// 				tale.verbose('dprox'.inverse)
// 			if (tale[actor].location != object) {
// 				let k = { actor, action: this, personae: actor, data: object }
// 				return tale[actor].stack ? tale[actor].stack.push(k) : tale[actor].stack = [k]
// 			}
// 			else
// 				tale.verbose(`${actor} already at the ${object}`.red)
// 			// if (tale.have(actor, object))
// 			// 	return tale.(`${actor} already have the ${object}.`)
// 			// if (!tale[actor].stack || !tale[actor].stack.some(e => e.actor == actor && e.data == object)) {
// 			// 	tale.verbose(`${actor} -> ${object}`)
// 			// }
// 		},
// 		functionConsequence : function (tale, personae, goal) {
// 			tale.verbose('dprox consequence')
// 			if (tale[personae].location != goal.data) {
// 				if (personae == goal.personae)
// 					tale["location"](tale, personae, personae, goal.data)
// 			}
// 			else {
// 				tale.verbose(`${personae} already at the ${goal.data}`.red)
// 				tale[personae].stack.splice( tale[personae].stack.indexOf(goal), 1 )
// 			}
// 			// verbose(goal)
// 			// let {data} = tale[personae].facts.find( e => e.actor == goal.data )
// 			// if (tale[personae].stack && tale[personae].stack.some(e => e.personae == personae && e.actor == personae && e.action == 'dprox' && e.data == data))
// 			// 	return verbose(`${actor} already have a plan to acquire ${goal.data}.`)
// 			//
// 			// let a = { personae, action: "dprox", actor: personae, data }
// 			// tale.verbose(`${personae} -> ${goal.data}`)
// 			// return tale[personae].stack.push(a)
// 		}
// 	}
//
// ]
