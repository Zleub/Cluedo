//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-23T20:30:08+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-02T18:40:25+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

let characters = [
	'Blue',
	'Red',
	'Yellow',
	'Green',
	'Violet',
	'Orange'
]

let relationships = [
	"unknown",
	"acquaintance",
	"friend",
	"relative",
	"close friends",
	"lover"
]

let motivations = [
	"money",
	"love",
	"mental illness"
]

let mandatoryParticularities = [
	[ 'man', 'woman' ]
]

let optionalParticularities = [
	[ 'fat', 'thin' ],
	[ 'tall', 'short' ],
	'hat',
	'glasses'
]

class Character {
	constructor(opt) {
		this._name = opt.name
		this._relationships = opt.relationships
		this._particularities = opt.particularities
	}

	name({name}) {
		if (!name)
			return this._name
		if (this._name == name)
			return this
	}

	particularities({particularities}) {
		if (!particularities)
			return this._particularities
		if (particularities && this._particularities.filter(e => e == particularities).length != 0)
			return this
	}

	relationships({state}) {
		if (!state)
			return this._relationships
		if (state)
			return this._relationships.filter( e => e.state == state )
	}
}

let f = () => (number) => {
	let _ = characters.map(e => {
		return { name: e }
	})
	let _characters = []

	for (var i = 0; i < number; i++) {
		let r = Math.floor( Math.random() * _.length )
		let [c] = _.splice(r, 1)
		_characters.push( c )
	}

	_characters.forEach( _ => {
		_.relationships = _characters.reduce( (p,e) => {
			let { name: _name } = _
			let { name } = e
			if (_name != name) {
				let other = _characters.find( e => e.name == name )
				if (other.relationships)
					p.push({
						character: e,
						state: other.relationships.find(e => e.character.name == _name).state
					})
				else
					p.push({
						character: e,
						state: relationships[ Math.floor( Math.random() * relationships.length ) ]
					})
			}
			return p
		}, [])
	})

	_characters.forEach( _ => {
		_.particularities = optionalParticularities.reduce( (p, e) => {
			let r = Math.round( Math.random() )
			if (r == 1) {
				if (e instanceof Array) {
					p.push(e[ Math.floor( Math.random() * e.length ) ])
				}
				else {
					p.push(e)
				}
			}
			return p
		}, []).concat( mandatoryParticularities.reduce( (p, e) => {
			if (e instanceof Array) {
				p.push(e[ Math.floor( Math.random() * e.length ) ])
			}
			else {
				p.push(e)
			}
			return p
		}, []))
	})

	let chronology = []
	let motivation = motivations[ Math.floor(Math.random() * motivations.length)]

	_characters = _characters.map( e => new Character(e) )
	return {
		characters: _characters,
		victim: _characters[Math.floor( Math.random() * _characters.length )],
		murderer: _characters[Math.floor( Math.random() * _characters.length )],
		motivation,
		chronology
	}
}

let g = f(characters, relationships, motivations)

module.exports = (number) => {
	let data = g(number)
	console.log(data)
	return {
		characters: ({name, particularities, relationships}) => {
			if (name)
				return data.characters.filter( e => e.name({name}) )
			else if (particularities)
				return data.characters.filter( e => e.particularities({particularities}) )
			else if (relationship)
				return data.characters.filter( e => e.relationships({relationship}) )
			else
				return data.characters
		},
		victim: () => data.victim
	}
}
