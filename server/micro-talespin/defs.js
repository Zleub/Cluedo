exports.location = function ({personae, actor, action, target}) {
		console.log(this)
}
// exports.defs = [
//     {
// 		name: 'location',
// 		text: {
// 			personae: ' is at the',
// 			object: 'in the'
// 		},
// 		function: function (tale, personae, actor, location) {
// 			let k = facts(actor, this, location)
// 			if (personae == actor) {
// 				tale[personae].location = location
// 				let old_location = tale[personae].facts ? tale[personae].facts.find(e => e.actor == personae && e.action.name == 'location') : undefined
// 				if (old_location)
// 					return tale[personae].facts.splice( tale[personae].facts.indexOf(old_location), 1, k)
// 			}
// 			tale[personae].facts ? tale[personae].facts.push(k) : tale[personae].facts = [k]
// 			tale.verbose(`${personae}: ${actor} -> ${location}`)
// 		},
// 		functionConsequence: function (tale) {}
// 	},
// 	{
// 		name: 'is-a',
// 		text: {
// 			personae: ' is a',
// 			object: 'is a'
// 		},
// 		function: function (tale, personae, is) {
// 			let k = facts(personae, this, is)
// 			tale[personae].facts ? tale[personae].facts.push(k) : tale[personae].facts = [k]
// 			tale[is] ? tale[is].push(personae) : tale[is] = [personae]
// 			tale.verbose(`${personae} -> ${is}`)
// 		},
// 		functionConsequence: function (tale) {}
// 	},
// 	{
// 		name: 'home',
// 		text: {
// 			personae: '\'s home is the',
// 			object: 'in the'
// 		},
// 		function: function (tale, personae, is) {
// 			let k = facts(personae, this, is)
// 			tale[personae].facts ? tale[personae].facts.push(k) : tale[personae].facts = [k]
// 			tale.verbose(`${personae} -> ${is}`)
// 		},
// 		functionConsequence: function (tale) {}
// 	},
// 	{
// 		name: 'food',
// 		text: {
// 			personae: '\'s food is the',
// 			object: 'in the'
// 		},
// 		function: function (tale, personae, foods) {
// 			let addFood = (food) => {
// 				let _addFood = (personae) => {
// 					let k = facts(personae, this, food)
// 					tale[personae].facts ? tale[personae].facts.push(k) : tale[personae].facts = [k]
// 					tale.verbose(`${personae} -> ${food}`)
// 				}
// 				if (tale[personae] instanceof Array)
// 					tale[personae].forEach( _addFood )
// 				else
// 					_addFood(personae)
// 			}
// 			if (foods instanceof Array)
// 				foods.forEach(e => addFood(e))
// 			else
// 				addFood(foods)
// 		},
// 		functionConsequence: function (tale) {}
// 	},
// 	{
// 		name: 'has',
// 		text: {
// 			personae: 'have the'
// 		},
// 		function: function (tale, personae, object) {
// 		},
// 		functionConsequence: function (tale) {}
// 	},
// 	{
// 		name: 'goal',
// 		text: {
// 			personae: 'is'
// 		},
// 		function: function(tale, personae, goal) {
// 			tale.verbose('goal'.inverse)
// 			let k = facts(personae, this, goal)
// 			tale[personae].stack ? tale[personae].stack.push(k) : tale[personae].stack = [k]
// 			tale.verbose(`${personae} -> ${goal}`)
// 		},
// 		functionConsequence: function (tale, personae, goal) {
// 			tale.verbose(`${personae} -> ${goal.data} consequence`)
// 			if (goal.data == 'hunger') {
// 				tale[personae].facts.filter( e => e.action.name == 'food').forEach( e => {
// 					tale.mods.find(e => e.name == 'dcont').function(tale, personae, e)
// 				})
// 			}
// 			if (goal.data == 'thirsty') {
// 				tale.mods.find(e => e.name == 'dcont').function(tale, personae, 'water')
// 			}
// 		}
// 	},
// ]
