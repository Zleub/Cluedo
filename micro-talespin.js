//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-07-07T23:33:34+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-09T22:54:28+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const colors = require('colors')

function verbose(...s) {
	let _verbose = (s) => {
		if (typeof s == 'string')
			console.log(s.grey)
		else if (typeof s == 'function')
			console.log(s.toString().grey)
		else if (typeof s == 'object')
			console.log(JSON.stringify(s, null, "  ").grey)
		else if (s === true)
			console.log("true".grey)
		else if (s === false)
			console.log("false".grey)
		else if (s === null)
			console.log("false".grey)
		else
			console.log("undefined".grey)
	}

	s.forEach( _verbose )
}

function facts(actor, action, data) {
	return { actor, action, data }
}

function talesFactory(mods) {
	let tale = function ({id, verbose, actors, personae, object, initFacts}) {
		this.id = id
		this._verbose = verbose
		this.personae = personae
		this.object = object
		this.actors = actors
		actors.forEach( e => this[e] = {})
		initFacts.forEach( e => e.call(this) )
	}
	tale.prototype.constructor = tale
	tale.prototype.verbose = function (s) { this._verbose ? verbose(s) : null }
	tale.prototype.run = function (identifier, item) {
		this.verbose('run')
		let count = 0
		while (count < 10) {
			this.verbose( "---- ---- ---- ----".underline )
			this.personae.reduce( (p, e) => {
				let plan =  this[e].stack ? this[e].stack[this[e].stack.length - 1] : undefined
				if (plan) {
					if (typeof plan.action == 'string')
						this.verbose(`${plan.action} not implemented`.red)
					else
						plan.action.functionConsequence(this, e, plan)
				}

				this.verbose( e.underline )
				this.verbose( this[e].stack )

				count += 1
				return p + this[e].goals ? this[e].goals.length : 0
			}, 0 )
		}
		console.log( "---- ---- ---- ----" )
		this.printFacts()
	}
	tale.prototype.is = function (identifier, item) {
		return this[identifier] ? this[identifier].some( e => e == item) : false
	}
	tale.prototype.have = function (actor, item) {
		this.verbose('have'.inverse)
		return this[actor].facts.some( e => e.actor == actor && e.data == item )
	}
	tale.prototype.printWorldFacts = function () {
		this.facts('World')
	}
	tale.prototype.printFacts = function (actor) {
		let isWorld = (actor) => actor == 'World' ? 'The world' : actor
		let print = (actor) => this[actor].facts.forEach( e => {
			if (this.is('personae', e.actor)) {
				if (actor != e.actor)
					console.log(`${isWorld(actor)} thinks that ${e.actor}${e.action.text.personae} ${e.data}`)
				else
					console.log(`${e.actor}${e.action.text.personae} ${e.data}`)
			}
			else if (this.is('object', e.actor)) {
				console.log(`${isWorld(actor)} thinks that there is ${e.actor} ${e.action.text.object} ${e.data}`)
			}
		})
		if (!actor) {
			this.actors.forEach(e => print(e))
		}
		else
			print(actor)
	}
	tale.prototype.mods = mods
	mods.forEach( e => {
		tale.prototype[e.name] = e.function.bind(e)
		if (e.functionConsequence)
			tale.prototype[`e.nameConsequence`] = e.functionConsequence.bind(e)
	})
	return tale
}

let t = new talesFactory([
	{
		name: 'location',
		text: {
			personae: ' is at the',
			object: 'in the'
		},
		function: function (tale, personae, actor, location) {
			let k = facts(actor, this, location)
			if (personae == actor) {
				tale[personae].location = location
				let old_location = tale[personae].facts ? tale[personae].facts.find(e => e.actor == personae && e.action.name == 'location') : undefined
				if (old_location)
					return tale[personae].facts.splice( tale[personae].facts.indexOf(old_location), 1, k)
			}
			tale[personae].facts ? tale[personae].facts.push(k) : tale[personae].facts = [k]
			tale.verbose(`${personae}: ${actor} -> ${location}`)
		},
		functionConsequence: function (tale) {}
	},
	{
		name: 'is-a',
		text: {
			personae: ' is a',
			object: 'is a'
		},
		function: function (tale, personae, is) {
			let k = facts(personae, this, is)
			tale[personae].facts ? tale[personae].facts.push(k) : tale[personae].facts = [k]
			tale[is] ? tale[is].push(personae) : tale[is] = [personae]
			tale.verbose(`${personae} -> ${is}`)
		},
		functionConsequence: function (tale) {}
	},
	{
		name: 'home',
		text: {
			personae: '\'s home is the',
			object: 'in the'
		},
		function: function (tale, personae, is) {
			let k = facts(personae, this, is)
			tale[personae].facts ? tale[personae].facts.push(k) : tale[personae].facts = [k]
			tale.verbose(`${personae} -> ${is}`)
		},
		functionConsequence: function (tale) {}
	},
	{
		name: 'food',
		text: {
			personae: '\'s food is the',
			object: 'in the'
		},
		function: function (tale, personae, foods) {
			let addFood = (food) => {
				let _addFood = (personae) => {
					let k = facts(personae, this, food)
					tale[personae].facts ? tale[personae].facts.push(k) : tale[personae].facts = [k]
					tale.verbose(`${personae} -> ${food}`)
				}
				if (tale[personae] instanceof Array)
					tale[personae].forEach( _addFood )
				else
					_addFood(personae)
			}
			if (foods instanceof Array)
				foods.forEach(e => addFood(e))
			else
				addFood(foods)
		},
		functionConsequence: function (tale) {}
	},
	{
		name: 'has',
		text: {
			personae: 'have the'
		},
		function: function (tale, personae, object) {
		},
		functionConsequence: function (tale) {}
	},
	{
		name: 'goal',
		text: {
			personae: 'is'
		},
		function: function(tale, personae, goal) {
			tale.verbose('goal'.inverse)
			let k = facts(personae, this, goal)
			tale[personae].stack ? tale[personae].stack.push(k) : tale[personae].stack = [k]
			tale.verbose(`${personae} -> ${goal}`)
		},
		functionConsequence: function (tale, personae, goal) {
			tale.verbose(`${personae} -> ${goal.data} consequence`)
			if (goal.data == 'hunger') {
				tale[personae].facts.filter( e => e.action.name == 'food').forEach( e => {
					tale.mods.find(e => e.name == 'dcont').function(tale, personae, e)
				})
			}
			if (goal.data == 'thirsty') {
				tale.mods.find(e => e.name == 'dcont').function(tale, personae, 'water')
			}
		}
	},
	{
		name: 'dcont',
		text: {
			personae: 'want to acquire'
		},
		function: function (tale, actor, object) {
			tale.verbose('dcont'.inverse)
			if (tale.have(actor, object))
				return tale.verbose(`${actor} already have the ${object}.`.red)
			if (!tale[actor].stack || !tale[actor].stack.some(e => e.actor == actor && e.data == object)) {
				tale.verbose(`${actor} -> ${object}`)
				let k = { actor, action: this, data: object }
				return tale[actor].stack ? tale[actor].stack.push(k) : tale[actor].stack = [k]
			}
		},
		functionConsequence : function (tale, personae, goal) {
			tale.verbose('dcont consequence')
			tale.verbose(`${personae} -> ${goal.data}`)
			// let {data} = tale[personae].facts.find( e => e.actor == goal.data )
			let fact = tale[personae].facts.find( e => e.actor == goal.data )
			if (fact) {
				let {data} = fact
				if (tale[personae].stack && tale[personae].stack.some(e => e.personae == personae && e.actor == personae && e.action == 'dprox' && e.data == data))
				return tale.verbose(`${actor} already have a plan to acquire ${goal.data}.`.red)

				tale.verbose(`${personae} -> ${data}`)
				tale.mods.find(e => e.name == 'dprox').function(tale, personae, data)
			}
			else {
				tale.verbose(`Find out someone who know where ${goal.data} is.`)
				let k = { personae, action: "dknow", data: goal.data }
				return tale[personae].stack ? tale[personae].stack.push(k) : tale[personae].stack = [k]
			}
		}
	},
	{
		name: 'dprox',
		text: {
			personae: 'want to move'
		},
		function: function (tale, actor, object) {
			tale.verbose('dprox'.inverse)
			if (tale[actor].location != object) {
				let k = { actor, action: this, personae: actor, data: object }
				return tale[actor].stack ? tale[actor].stack.push(k) : tale[actor].stack = [k]
			}
			else
				tale.verbose(`${actor} already at the ${object}`.red)
			// if (tale.have(actor, object))
			// 	return tale.(`${actor} already have the ${object}.`)
			// if (!tale[actor].stack || !tale[actor].stack.some(e => e.actor == actor && e.data == object)) {
			// 	tale.verbose(`${actor} -> ${object}`)
			// }
		},
		functionConsequence : function (tale, personae, goal) {
			tale.verbose('dprox consequence')
			if (tale[personae].location != goal.data) {
				if (personae == goal.personae)
					tale["location"](tale, personae, personae, goal.data)
			}
			else {
				tale.verbose(`${personae} already at the ${goal.data}`.red)
				tale[personae].stack.splice( tale[personae].stack.indexOf(goal), 1 )
			}
			// verbose(goal)
			// let {data} = tale[personae].facts.find( e => e.actor == goal.data )
			// if (tale[personae].stack && tale[personae].stack.some(e => e.personae == personae && e.actor == personae && e.action == 'dprox' && e.data == data))
			// 	return verbose(`${actor} already have a plan to acquire ${goal.data}.`)
			//
			// let a = { personae, action: "dprox", actor: personae, data }
			// tale.verbose(`${personae} -> ${goal.data}`)
			// return tale[personae].stack.push(a)
		}
	}

])

console.log(t)

let _ = new t({
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
		function () { this["location"](this, 'Joe', 'Joe', 'cave') },
		function () { this["location"](this, 'World', 'Joe', 'cave') },
		function () { this["location"](this, 'Irving', 'Joe', 'cave') },

		function () { this["location"](this, 'Irving', 'Irving', 'oak tree') },
		function () { this["location"](this, 'World', 'Irving', 'oak tree') },
		function () { this["location"](this, 'Joe', 'Irving', 'oak tree') },

		function () { this["location"](this, 'World', 'water', 'river') },
		// function () { this["location"](this, 'Joe', 'water', 'river') },
		function () { this["location"](this, 'World', 'honey', 'elm tree') },
		function () { this["location"](this, 'Irving', 'honey', 'elm tree') },
		function () { this["location"](this, 'World', 'worm', 'ground') },
		function () { this["location"](this, 'Joe', 'worm', 'ground') },
		function () { this["location"](this, 'World', 'fish', 'river') },
		function () { this["location"](this, 'Irving', 'fish', 'river') },

		function () { this["is-a"](this, 'Joe', 'bear') },
		function () { this["home"](this, 'Joe', 'cave') },

		function () { this["is-a"](this, 'Irving', 'bird') },
		function () { this["home"](this, 'Irving', 'oak tree') },

		function () { this["food"](this, 'bear', ['honey', 'berries', 'fish']) },
		function () { this["food"](this, 'bird', 'worm') },

		function () { this["goal"](this, 'Joe', 'thirsty') }
	]
})

// console.log(JSON.stringify(_, null, "  "))
_.printFacts()
_.run()
// _.printGoals()
