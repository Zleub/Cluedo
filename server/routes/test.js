//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-20T20:32:05+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-08-06T21:49:24+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { readFileSync } = require('fs')
const { graphql, buildSchema, printSchema } = require('graphql')

exports.get = function () {
	let { load } = require('../micro-talespin/utils.js')
	let ts = load()
	let _ = new ts({
		id: 0,
		initFacts: require('../micro-talespin/story0.json')
	})

	this.res.end(JSON.stringify(_, null, "  "))
}

exports.post = function(id) {
	delete require.cache['../micro-talespin/micro-talespin.js']
	let { ts } = require('../micro-talespin/micro-talespin.js')

	fs.readdir('./server/micro-talespin/', (err, files) => {
		let data = files.reduce( (p, e) => {
			if (e != 'micro-talespin.js' && e.match(/.*\.js$/)) {
				let _ = require(`../micro-talespin/${e}`)
				Object.keys(_).forEach( k => {
					if (p[k])
						console.warn(`warning, erasing ${k}`)
					p[k] = _[k]
				})
			}
			return p
		}, {})

		_ts = new ts(data)
		let _ = new _ts({
			id: 0,
			initFacts: require('../micro-talespin/story0.json')
		})
		console.log(_)

		var schema = buildSchema(readFileSync('./server/schema/test.graphql').toString())
		graphql(schema, this.req.body.query, { story: ({id}) => _ }, null, {id})
		.then(e => this.res.end(JSON.stringify(e, null, "  ")))
	})
}
