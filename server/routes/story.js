//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-20T20:59:09+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-06T18:13:31+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { readFileSync } = require('fs')
const Story = require('../scripts/story.js')
const { graphql, buildSchema, printSchema } = require('graphql')

var schema = buildSchema(`
	type Story {
		id: Int
		characters(id: Int, particularities: String): [ Character ]
	}

	type Relationship {
		state: String
		character: Character
	}

	type Character {
		id: Int
		name: String
		texture: String
		age: String
		particularities: [String]
		relationships(state: String): [Relationship]
	}

	type Query {
		story(id: Int): Story
	}
`)

console.log( printSchema(schema) )

exports['/:id'] = {
	get: function (id) {
		graphql(schema, readFileSync('./server/query/story.graphql').toString(), {
			story: ({id}) => {
				delete require.cache[require.resolve('../scripts/story.js')];
				let Story = require('../scripts/story.js');
				return process.stories[id] || new Story(16)
			}
		}, null, {id})
		.then(e => this.res.end(JSON.stringify(e, null, "  ")))
	},
	post: function (id) {
		// this.res.end('Hello')
		if (!this.req.body || !this.req.body.query)
			return this.res.end(JSON.stringify({
				errors: [
					{
						message : `No body query`
					}
				]
			}))
		graphql(schema, this.req.body.query, {
			story: ({id}) => {
				delete require.cache[require.resolve('../scripts/story.js')];
				let Story = require('../scripts/story.js');
				return process.stories[id] ? process.stories[id] : (process.stories[id] = new Story(16))
			}
		}, null, {id})
		.then(e => this.res.end(JSON.stringify(e, null, "  ")))
	}
}
