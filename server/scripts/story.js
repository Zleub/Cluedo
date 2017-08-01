//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-07-02T21:37:11+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-10T20:00:57+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const crypto = require('crypto');
const Chance = require('chance')
const Character = require('./character.js')

const characters = {
	man : [
		"Golden King",
		"Red Headphones",
		"Cute Totoro",
		"Jack Sparrow",
		"James Raynor",
		"Torven",
		"Team Orange",
		"Retro",
		"Dobos",
		"Awaken",
		"Skull Jacket",
		"Backpack Boy"
	],
	woman : [
		"Summer Overalls",
		"Oceana",
		"Lizzie",
		"Navy Scarf",
		"Doge Onesie",
		"Summer Skies",
		"Ocean Blue",
		"Meow",
		"Twilight Wolf",
		"Cotton Candy",
		"Pastel Casual",
		"Ocean Blues",
	]
}

const age_type = [
	"teen",
	"adult",
	"senior"
]

const relationships = (a, b, current) => {
	// let _ = [
	// 	{ male: "father", female: "mother", _male: "son", _female: "daughter" },
	// 	{ male: "brother", female: "sister", _male: "brother", _female: "sister" },
	// 	{ male: "son", female: "daughter", _male: "father", _female: "mother" }
	// ]
	//
	// if (b.relationships) {
	// 	let reciproque = b.relationships.find( e => e.character.name == a.name)
	// 	if (reciproque) {
	// 		let r = _.find( e => e.male == reciproque.state || e.female == reciproque.state)
	// 		let gender = a.particularities.find( e => e == 'Female' || e == 'Male')
	// 		return {
	// 			state: r[`_${gender.toLowerCase()}`],
	// 			character: b
	// 		}
	// 	}
	// }
	//
	// let r = optionalRand(_)
	// while ((r && r.male == 'father' && a.age == 'teen'))
	// 	r = optionalRand(_)
	// while (r && r.male == 'son' && a.age == 'senior')
	// 	r = optionalRand(_)
	// while (r && current.find( e => e.state == 'father' || e.state == 'mother' ))
	// 	r = optionalRand(_)
	// let gender = a.particularities.find( e => e == 'Female' || e == 'Male')
	// if (r) {
	// 	console.log(r[gender.toLowerCase()])
	// 	return {
	// 		state: r[gender.toLowerCase()],
	// 		character: b
	// 	}
	// }
}

const motivations = [
	"money",
	"love",
	"mental illness"
]

const particularities = [
	(chance) => chance.gender(),
	() => optionalRand([ 'Fat', 'Thin' ]),
	() => optionalRand([ 'Tall', 'Short' ]),
	() => optionalRand('Hat'),
	() => optionalRand('Glasses')
]

let randArray = (array) => {
	return array[ Math.floor( Math.random() * array.length ) ]
}
let extractRandArray = (array) => {
	let r = Math.floor( Math.random() * array.length )
	return array.splice(r, 1)[0]
}
let optionalRand = (e) => {
	let r = Math.round( Math.random() )
	if (r == 1) {
		if (e instanceof Array) {
			return randArray(e)
		}
		else {
			return e
		}
	}
}

class Story {
	constructor(number) {
		if (number > characters.length)
			console.error({ error: 'Not enought characters !' })
		else {
			let chance = new Chance()
			let tmpManCharacters = characters.man.map(e => e)
			let tmpWomanCharacters = characters.woman.map(e => e)
			this._characters = []

			console.log(`Randomly picking ${number} characters`)
			for (var i = 0; i < number; i++) {
				this._characters.push( {
					relationships: [],
					age: randArray(age_type)
				} )
			}

			let teen_nbr = this._characters.reduce((p,e) => (e.age == 'teen' ? p + 1 : p), 0)
			console.log(`Randomly picking ${teen_nbr} teen`)
			let adult_nbr = this._characters.reduce((p,e) => (e.age == 'adult' ? p + 1 : p), 0)
			console.log(`Randomly picking ${adult_nbr} adult`)
			let senior_nbr = this._characters.reduce((p,e) => (e.age == 'senior' ? p + 1 : p), 0)
			console.log(`Randomly picking ${senior_nbr} senior`)

			this._characters.forEach( _ => {
				_.particularities = particularities.reduce( (p, e) => {
					let _p = e(chance)

					if (_p)
						p.push(_p)
					if (_p == 'Female') {
						let c = extractRandArray(tmpWomanCharacters)
						_.texture = c
						_.firstname = chance.first({ gender: "female" })
					}
					if (_p == 'Male') {
						let c = extractRandArray(tmpManCharacters)
						_.texture = c
						_.firstname = chance.first({ gender: "male" })
					}
					return p
				}, [])
			})

			;(function (_characters) {
			let seniors = _characters.filter( e => e.age == 'senior')
			let a = seniors.find( e =>
				e.particularities.find( e => e == 'Male') && !(e.relationships.find( e => e.state == 'husband' ))
			)
			let b = seniors.find( e =>
				e.particularities.find( e => e == 'Female') && !(e.relationships.find( e => e.state == 'wife' ))
			)

			while (a && b) {
				let last = chance.last()
				a.lastname = last
				a.relationships.push({
					state: 'husband',
					character: b
				})
				b.lastname = last
				b.relationships.push({
					state: 'wife',
					character: a
				})

				let adults = _characters.filter( e => e.age == 'adult')
				let _adults = adults.filter( e => !e.relationships.find( e => {
						return e.state == 'son' || e.state == 'daughter'
				}))

				let rand = Math.floor( Math.random() * 3 ) + 1
				for (var i = 0; i < rand; i++) {
					let c = extractRandArray(_adults)

					if (c && c.particularities.find( e => e == 'Male' )) {
						c.lastname = last
						c.relationships.push({
							state: 'son',
							character: a
						})
						c.relationships.push({
							state: 'son',
							character: b
						})
						a.relationships.push({
							state: 'father',
							character: c
						})
						b.relationships.push({
							state: 'mother',
							character: c
						})
					}
					if (c && c.particularities.find( e => e == 'Female' )) {
						c.lastname = last
						c.relationships.push({
							state: 'daughter',
							character: a
						})
						c.relationships.push({
							state: 'daughter',
							character: b
						})
						a.relationships.push({
							state: 'father',
							character: c
						})
						b.relationships.push({
							state: 'mother',
							character: c
						})
					}
				}

				a = seniors.find( e =>
					e.particularities.find( e => e == 'Male') && !(e.relationships.find( e => e.state == 'husband' ))
				)
				b = seniors.find( e =>
					e.particularities.find( e => e == 'Female') && !(e.relationships.find( e => e.state == 'wife' ))
				)
			}
		})(this._characters)

		;(function (_characters) {
			let adults = _characters.filter( e => e.age == 'adult')
			let a = adults.find( e =>
				e.particularities.find( e => e == 'Male') && !(e.relationships.find( e => e.state == 'husband' ))
			)
			let b = adults.find( e =>
				e.particularities.find( e => e == 'Female') && !(e.relationships.find( e => e.state == 'wife' ))
			)

			while (a && b) {
				let last = a.lastname || chance.last()
				a.lastname = last
				a.relationships.push({
					state: 'husband',
					character: b
				})
				b.lastname = last
				b.relationships.push({
					state: 'wife',
					character: a
				})

				let childs = _characters.filter( e => e.age == 'teen')
				let _childs = childs.filter( e => !e.relationships.find( e => {
						return e.state == 'son' || e.state == 'daughter'
				}))

				let rand = Math.floor( Math.random() * 3 ) + 1
				for (var i = 0; i < rand; i++) {
					let c = extractRandArray(_childs)

					if (c && c.particularities.find( e => e == 'Male' )) {
						c.lastname = last
						c.relationships.push({
							state: 'son',
							character: a
						})
						c.relationships.push({
							state: 'son',
							character: b
						})
						a.relationships.push({
							state: 'father',
							character: c
						})
						b.relationships.push({
							state: 'mother',
							character: c
						})
					}
					if (c && c.particularities.find( e => e == 'Female' )) {
						c.lastname = last
						c.relationships.push({
							state: 'daughter',
							character: a
						})
						c.relationships.push({
							state: 'daughter',
							character: b
						})
						a.relationships.push({
							state: 'father',
							character: c
						})
						b.relationships.push({
							state: 'mother',
							character: c
						})
					}
				}

				a = adults.find( e =>
					e.particularities.find( e => e == 'Male') && !(e.relationships.find( e => e.state == 'husband' ))
				)
				b = adults.find( e =>
					e.particularities.find( e => e == 'Female') && !(e.relationships.find( e => e.state == 'wife' ))
				)

			}
		})(this._characters)

			this._characters = this._characters.map( e => new Character(e) )
			this._characters.forEach( e => {
				e._relationships = e._relationships.map( _ => {
					const hash = crypto.createHash('sha256');
					hash.update(_.character.firstname + ' ' + _.character.lastname + _.character.age);
					let id = hash.digest('hex');
					_.character = this._characters.find( e => {
						// console.log(e.id({}), id)
						return e.id({}) == id
					})
					return _
				})
			})
			this._victim = randArray(this._characters),
			this._murderer = randArray(this._characters),
			this._motivation = []
			this._chronology = randArray(motivations)
		}
	}

	characters({id, particularities}) {
		if (typeof id == 'number')
			return [ this._characters[id] ]
		else if (particularities) {
			return this._characters.filter( e => e.particularities({particularities}))
		}
		else {
			return this._characters
		}
	}
}

module.exports = Story
