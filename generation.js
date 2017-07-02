//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-23T20:30:08+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-02T03:14:10+02:00
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

	let victim = _characters[Math.floor( Math.random() * _characters.length )]
	let murderer = _characters[Math.floor( Math.random() * _characters.length )]

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

	// console.log(JSON.stringify(_characters, null, "  "))
	// console.log(`${victim.name} has be killed by ${murderer.name} because of ${motivation}`)
	// console.log(chronology)
	return { characters: _characters, victim, murderer, chronology }
}

let g = f(characters, relationships, motivations)

module.exports = (number) => {
	let data = g(number)
	return {
		characters: ({name, particularity, relationship},b,c) => {
			console.log({name, particularity, relationship},b,c)
			console.log(c.fieldNodes[0].arguments, c.fieldNodes[0].name)
			if (name)
				return [ data.characters.find( ({name: _name}) => _name == name ) ]
			else if (particularity) {
				return data.characters.filter( ({particularities}) => particularities.find( _ => _ == particularity) )
			}
			else if (relationship) {
				return data.characters.filter( ({relationships}) => relationships.find( ({state}) => state == relationship) )
			}
			else
				return data.characters
		},
		relationships: () => console.log("Hello !"),
		victim: () => data.victim
	}
}
