//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-20T20:59:09+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-02T22:33:38+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { graphql, buildSchema, printSchema } = require('graphql')

var schema = buildSchema(`
	type Story {
		id: Int
		characters(id: Int): [ Character ]
	}

	type Character {
		id: Int
		name: String
		particularities: [String]
	}

	type Query {
		getStory(id: Int): Story
	}
`)

console.log( printSchema(schema) )

exports['/:id'] = {
	get: function (id) {
		graphql(schema, `{
			getStory(id: ${id}) {
				id
				characters {
					name
					particularities
				}
			}
		}`, {
			getStory: ({id}) => {
				return process.stories[id]
			}
		}).then(e => this.res.end(JSON.stringify(e)))
	}
}
