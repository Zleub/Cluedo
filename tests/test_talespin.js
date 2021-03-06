//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-09-03T20:34:20+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-12T04:19:11+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { graphql, buildSchema, printSchema } = require("graphql")
const { readFileSync, readdir } = require("fs")
const { load, verbose, Personae } = require("./server/micro-talespin")
const colors = require('colors')
// colors.styles.test = [ open: '\u001b[31m', close: '\u001b[39m', closeRe: /[39m/g ]

readdir("./server/micro-talespin/", (err, files) => {
	// let types = [
	// 	String,
	// 	Number,
	// 	Personae
	// ].map( c => {
	// 	let AnonymousDictionary = DictionaryFunctor(c)
	// 	console.log((new AnonymousDictionary).name.magenta)
	//
	// 	let i = new AnonymousDictionary;
	// 	[
	// 		() => i.insert("test", "test"),
	// 		() => i.insert("test2", 42),
	// 		() => i.insert("test3", new Personae("Joe"))
	// 	].forEach( f => {
	// 		try { f() } catch (e) { console.log(e) }
	// 	})
	// 	console.log(i)
	// })

	let _ts = load()
	let _ = new _ts({
		id: 0,
		initFacts: require("./server/micro-talespin/story0.json")
	})

	// verbose(require('colors'))
	// verbose(_)
	// verbose(_.mods)
	console.log('-- -- -- --')
	console.log( _.introspect() )
})
