//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-20T20:32:05+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-09T00:55:49+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

require('colors')
const { Personae, verbose, load } = require("../micro-talespin")
const { readFileSync } = require("fs")
const { graphql, buildSchema, printSchema } = require("graphql")

exports.get = function() {
	let { load } = require("../micro-talespin/utils.js")
	let ts = load()
	let _ = new ts({
		id: 0,
		initFacts: require("../micro-talespin/story0.json")
	})

	this.res.end(JSON.stringify(_, null, "  "))
}

exports.post = function(id) {
		let _ts = load()
		let _ = new _ts({
			id: 42,
			initFacts: require("../micro-talespin/story0.json")
		})

		var schema
		try {
			schema = buildSchema(
				readFileSync("./server/schema/talespin.graphql").toString()
			)
		} catch (e) {
			return this.res.end(
				JSON.stringify({ errors: [{ message: e.message }] })
			)
		}
		// verbose(this.req.body.query)
		verbose(_.personae())
		graphql(
			schema,
			this.req.body.query,
			{ story: ({ id }) => _ },
			null,
			{ id }
		).then(e => {
			this.res.end(JSON.stringify(e))
		})
	// })
}
