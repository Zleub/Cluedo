//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-20T20:59:09+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-07T00:15:35+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { readFileSync } = require("fs")
const Story = require("../scripts/story.js")
const { graphql, buildSchema, printSchema } = require("graphql")

exports["/:id"] = {
	get: function(id) {
		let schema
		try {
			schema = buildSchema(
				readFileSync("./server/schema/talespin.graphql").toString()
			)

		} catch (e) {
			console.log('tests')
			return this.res.end(e.message)
		} finally {

		}
		graphql(
			schema,
			readFileSync("./server/query/story.graphql").toString(),
			{
				story: ({ id }) => {
					delete require.cache[require.resolve("../scripts/story.js")]
					let Story = require("../scripts/story.js")
					return process.stories[id] || new Story(16)
				}
			},
			null,
			{ id }
		).then(e => this.res.end(JSON.stringify(e, null, "  ")))
	},
	post: function(id) {
		if (!this.req.body || !this.req.body.query)
			return this.res.end(
				JSON.stringify({
					errors: [
						{
							message: `No body query`
						}
					]
				})
			)
		let schema = buildSchema(
			readFileSync("./server/schema/talespin.graphql").toString()
		)
		console.log('testB')
		graphql(
			schema,
			this.req.body.query,
			{
				story: ({ id }) => {
					delete require.cache[require.resolve("../scripts/story.js")]
					let Story = require("../scripts/story.js")
					return process.stories[id]
						? process.stories[id]
						: (process.stories[id] = new Story(16))
				}
			},
			null,
			{ id }
		).then(e => this.res.end(JSON.stringify(e, null, "  ")))
	}
}
