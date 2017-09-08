//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-09-03T20:34:20+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-09T00:26:12+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { verbose } = require("./server/micro-talespin/utils.js")
const { graphql, buildSchema, printSchema } = require("graphql")
const { readFileSync, readdir } = require("fs")

delete require.cache["./server/micro-talespin/micro-talespin.js"]
let { talesFactory } = require("./server/micro-talespin/micro-talespin.js")

readdir("././server/micro-talespin/", (err, files) => {
	let data = files.reduce((p, e) => {
		if (e != "micro-talespin.js" && e != "index.js" && e.match(/.*\.js$/)) {
			let _ = require(`./server/micro-talespin/${e}`)
			Object.keys(_).forEach(k => {
				if (p[k]) console.warn(`warning, erasing ${k}`)
				p[k] = _[k]
			})
		}
		return p
	}, {})

	let _ts = new talesFactory(data)
	let _ = new _ts({
		id: 0,
		initFacts: require("./server/micro-talespin/story0.json")
	})

	var schema
	try {
		schema = buildSchema(
			readFileSync("./server/schema/talespin.graphql").toString()
		)
	} catch (e) {
		console.log(e.message.red)
		// return this.res.end(
		// 	JSON.stringify({ errors: [{ message: e.message }] })
		// )
	}
	// verbose(this.req.body.query)
	verbose(_.personae())
	// graphql(
	// 	schema,
	// 	this.req.body.query,
	// 	{ story: ({ id }) => _ },
	// 	null,
	// 	{ id }
	// ).then(e => {
	// 	this.res.end(JSON.stringify(e))
	// })
})
