//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-07-02T21:37:11+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-02T22:32:18+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const Character = require('./character.js')

const characters = [
	'Blue',
	'Red',
	'Yellow',
	'Green',
	'Violet',
	'Orange'
]

const relationships = [
	"unknown",
	"acquaintance",
	"friend",
	"relative",
	"close friends",
	"lover"
]

const motivations = [
	"money",
	"love",
	"mental illness"
]

const mandatoryParticularities = [
	[ 'man', 'woman' ]
]

const optionalParticularities = [
	[ 'fat', 'thin' ],
	[ 'tall', 'short' ],
	'hat',
	'glasses'
]

class Story {
	constructor(number) {
		if (number > characters.length)
			console.error({ error: 'Not enought characters !' })
		else {
			let _ = characters.map(e => {
				return { name: e }
			})
			this._characters = []

			for (var i = 0; i < number; i++) {
				let r = Math.floor( Math.random() * _.length )
				let [c] = _.splice(r, 1)
				this._characters.push( c )
			}

			this._characters.forEach( _ => {
				_.relationships = this._characters.reduce( (p,e) => {
					let { name: _name } = _
					let { name } = e
					if (_name != name) {
						let other = this._characters.find( e => e.name == name )
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

			this._characters.forEach( _ => {
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

			this._characters = this._characters.map( e => new Character(e) )
			this._victim = this._characters[Math.floor( Math.random() * this._characters.length )],
			this._murderer = this._characters[Math.floor( Math.random() * this._characters.length )],
			this._motivation = []
			this._chronology = motivations[ Math.floor(Math.random() * motivations.length)]
		}
	}

	characters({id}) {
		if (id)
			return [ this._characters[id] ]
		else {
			return this._characters
		}
	}
}

module.exports = Story
