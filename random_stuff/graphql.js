//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-07-01T19:40:17+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-07-02T03:11:50+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const characters = require('./generation.js')(5)
const { graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	printType,
	printSchema,
	buildSchema
 } = require('graphql')

const prettyPrint = (e) => console.log(JSON.stringify(e, null, "  "))

var schema = buildSchema(`
	type Character {
		name: String
		particularities: [String]
		relationships(state: String): [Relationship]
	}

	type Query {
		victim: Character
		characters(
			name: String
			particularity: String
			relationship: String
		): [Character]
		relationships(state: String): [Relationship]
		relationships(state: String): [Character]
	}

	type Relationship {
		character: Character
		state: String
	}
`)

graphql(schema, `{
	characters(relationship: "friend") {
		name
		relationships(state: "friend") {
			character {
				name
			}
		}
	}
}`, characters).then(prettyPrint)
