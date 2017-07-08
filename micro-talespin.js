//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-07-07T23:33:34+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-08T00:42:51+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

function talesFactory(mods) {
	let tale = function ({id, variables, initFacts}) {
		this.id = id,
		variables.forEach( e => this[e] = {})
		initFacts.forEach( e => e.call(this) )
	}
	tale.prototype.constructor = tale
	mods.forEach( e => {
		tale.prototype[e.name] = e.function
		tale.prototype[`e.nameConsequence`] = e.functionConsequence
	})
	return tale
}

function knowledge(actor, action, data) {
	console.log(actor, action, data)
	this.actor = actor
	this.action = action
	this.data = data
}

let t = new talesFactory([
	{
		name: 'location',
		text: 'is at',
		function: function (actor, location) {
			console.log('When someone change location')
			let k = new knowledge(actor, this.location, location)
			this[actor].location = location
			this[actor].knowledge ? this[actor].knowledge.push(location) : this[actor].knowledge = k
		},
		functionConsequence: function (knowledge) {
			console.log('Everyone should knows that someone changes location')
			console.log(this)
		}
	}
])

console.log(t)

let _ = new t({
	id: 0,
	variables: [
		'world',
		'joe',
		'irwing'
	],
	initFacts: [
		function () {
			console.log('anonymous fact')
			console.log(this)
			this.location('joe', 'cave')
		}
	]
})

console.log(_)
