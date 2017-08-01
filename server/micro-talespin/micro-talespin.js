const colors = require('colors')

const _usage = {
	'--verbose': 'this option is verbosity'
}

let usage = process.argv.reduce( (p, e) => {
	Object.keys(_usage).forEach( _ => {
		if (e == _)
			p[_] = true
	})
	return p
}, {})

function verbose(...s) {
	if (!usage['--verbose'])
		return

	let _verbose = (s) => {
		if (typeof s == 'string')
			console.log(s)
		else if (typeof s == 'function')
			console.log(s.toString())
		else if (typeof s == 'object')
			console.log(JSON.stringify(s, null, "  "))
		else if (s === true)
			console.log("true")
		else if (s === false)
			console.log("false")
		else if (s === null)
			console.log("false")
		else
			console.log("undefined")
	}

	s.forEach( _verbose )
}

function facts(actor, action, data) {
	return { actor, action, data }
}

function talesFactory(mods) {
	let tale = function ({id, actors, personae, object, initFacts}) {
		this.id = id
		this.personae = personae
		this.object = object
		this.actors = actors
		actors.forEach( e => this[e] = {})
		// initFacts.forEach( e => e.call(this) )
		console.log(initFacts)
		console.log(this)

		this.location()
	}
	// tale.prototype.constructor = tale
	// tale.prototype.verbose = function (s) { this._verbose ? verbose(s) : null }
	// tale.prototype.run = function (identifier, item) {
	// 	this.verbose('run')
	// 	let count = 0
	// 	while (count < 10) {
	// 		this.verbose( "---- ---- ---- ----".underline )
	// 		this.personae.reduce( (p, e) => {
	// 			let plan =  this[e].stack ? this[e].stack[this[e].stack.length - 1] : undefined
	// 			if (plan) {
	// 				if (typeof plan.action == 'string')
	// 					this.verbose(`${plan.action} not implemented`.red)
	// 				else
	// 					plan.action.functionConsequence(this, e, plan)
	// 			}
	//
	// 			this.verbose( e.underline )
	// 			this.verbose( this[e].stack )
	//
	// 			count += 1
	// 			return p + this[e].goals ? this[e].goals.length : 0
	// 		}, 0 )
	// 	}
	// 	console.log( "---- ---- ---- ----" )
	// 	this.printFacts()
	// }
	// tale.prototype.is = function (identifier, item) {
	// 	return this[identifier] ? this[identifier].some( e => e == item) : false
	// }
	// tale.prototype.have = function (actor, item) {
	// 	this.verbose('have'.inverse)
	// 	return this[actor].facts.some( e => e.actor == actor && e.data == item )
	// }
	// tale.prototype.printWorldFacts = function () {
	// 	this.facts('World')
	// }
	// tale.prototype.printFacts = function (actor) {
	// 	let isWorld = (actor) => actor == 'World' ? 'The world' : actor
	// 	let print = (actor) => this[actor].facts.forEach( e => {
	// 		if (this.is('personae', e.actor)) {
	// 			if (actor != e.actor)
	// 				console.log(`${isWorld(actor)} thinks that ${e.actor}${e.action.text.personae} ${e.data}`)
	// 			else
	// 				console.log(`${e.actor}${e.action.text.personae} ${e.data}`)
	// 		}
	// 		else if (this.is('object', e.actor)) {
	// 			console.log(`${isWorld(actor)} thinks that there is ${e.actor} ${e.action.text.object} ${e.data}`)
	// 		}
	// 	})
	// 	if (!actor) {
	// 		this.actors.forEach(e => print(e))
	// 	}
	// 	else
	// 		print(actor)
	// }
	tale.prototype.mods = mods
	console.log(mods)
	Object.keys(mods).forEach(k => {
		console.log(k, mods[k])
		tale.prototype[k] = mods[k]
	})

	// mods.forEach( e => {
		// console.log(e)
		// tale.prototype[e.name] = e.function.bind(e)
		// if (e.functionConsequence)
		// 	tale.prototype[`e.nameConsequence`] = e.functionConsequence.bind(e)
	// })
	return tale
}

let defs = require('./defs.js')
let { actions } = require('./actions.js')

exports.ts = new talesFactory(defs)
