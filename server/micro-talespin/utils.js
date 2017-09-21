//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-08-06T02:51:52+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-15T11:53:57+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const fs = require('fs')
const util = require('util');

exports.getopt = (options) => {
	let opts = {}
	process.argv.forEach((arg, i) => {
		options.forEach(t => {
			if (t[0].some(e => e == arg))
				t[2](opts, process.argv[i + 1])
		})
	})
	return opts
}

const verbose = (...s) => {
	let _verbose = (e, i) => {
		process.stdout.write(util.inspect(e, {
			depth: null,
			colors: true,
			// showHidden: true
		}))
		if (i == s.length - 1)
			process.stdout.write("\n")
		else
			process.stdout.write("  ")
	}
	s.forEach(_verbose)
}
exports.verbose = verbose

exports.load = () => {
	let {
		talesFactory
	} = require(`./micro-talespin.js`)
	let files = fs.readdirSync('./server/micro-talespin/')
	let data = files.reduce((p, e) => {
		if (e != 'index.js' && e != 'micro-talespin.js' && e.match(/.*\.js$/)) {
			delete require.cache[`./${e}`]
			let _ = require(`./${e}`)

			if (_.talesFactory)
				talesFactory = _.talesFactory
			Object.keys(_).forEach(k => {
				if (p[k])
					console.warn(`warning, erasing ${k}`)
				p[k] = _[k]
			})
		}
		return p
	}, {})

	return new talesFactory(data)
}

let Dictionary = class extends Object {
	static isDictionary(e) {
		return e instanceof Dictionary
	}
}

exports.DictionaryFunctor = (type) => {
	let _class = class extends Dictionary {
		static get name() {
			return type.name + "Dictionary"
		}

		static get type() {
			return type
		}

		insert(k, v) {
			if (v.constructor.name != type.name)
				throw `No such type ${v.constructor.name} in ${this.name}`
			else
				this[k] = v
		}
	}
	return _class
}

exports.ArrayFunctor = (type) => {
	let _class = class extends Array {
		static get type() {
			return type
		}

		static get name() {
			return type.name + "Array"
		}

		push(v) {
			if (v.constructor.name != type.name)
				throw `No such type ${v.constructor.name} in ${this.name}`
			else
				Array.prototype.push.call(this, v)
		}
	}
	return _class
}

const JStoQraphQL = (object) => {
	let type = typeof(object)
	if (type == "number")
		return "Int".green
	else if (type == "string")
		return "String".green
	else if (type == "object" && object) {
		return object.constructor.name
	}
	// else if (type == "function")
	// 	return "Function"
}

const toGraphQLString = (that, types) => (p, k) => {
	let t = JStoQraphQL(that[k])
	if (!t)
		return p

	if (t == 'Int' || t == 'String')
		return p + "    " + k + ": " + t + "\n"
	if (t == "Function")
		return p + "    " + k + "(" + " ??? " + "): " + t.red + "\n"
	else if (that[k] instanceof Array && that[k].constructor.type) {
		types.push(that[k])
		return p + "    " + k + ": [" + that[k].constructor.type.name + "]!\n"
	} else if (that[k] instanceof Object) {
		// if (Dictionary.isDictionary(that[k])) {
		// 	if (that[k][ Object.keys(that[k])[0] ] instanceof Object)
		// 		types.push(that[k][ Object.keys(that[k])[0] ])
		// 	return p + "    " + k + "(item: String): " + `${that[k].constructor.type.name}!\n`
		// }
		// if (that[k][0]) {
		that[k].constructor = {}
		that[k].constructor.name = k
		types.push(that[k])
		// return p + "    " + k + "(key: Int): [" + t + "]!\n"
		return p + "    " + k + "(key: String): " + JStoQraphQL(that[k]) + "\n"

	} else
		return p + "    " + k + ": " + t + "\n"
}

// const introspect = function (schema) {
// 	if (schema) {
// 		if (schema.match(`type ${this.constructor.name} {`))
// 			return schema
// 		schema += `type ${this.constructor.name} {\n`
// 	}
// 	else
// 		schema = `type ${this.constructor.name} {\n`
//
// 	let childs = []
// 	let keys = []
// 	let e = this
// 	do {
// 		keys = keys.concat(Object.getOwnPropertyNames(e)).filter(function(item, pos, self) {
// 			return self.indexOf(item) == pos;
// 		})
// 		e = e.__proto__
// 	} while (e != null)
// 	// let keys = Object.keys(this).concat( Object.keys(Object.getPrototypeOf(this)) )
//
// 	schema += keys.reduce( toGraphQLString(this, childs), "")
// 	schema += "}\n"
//
// 	childs.forEach( e => schema = introspect.call(e, schema) )
// 	return schema
// }

class Schema extends Array {
	inspect() {
		process.stdout.write(JSON.stringify(this, null, "  ") + "\n")
		let childs_type = []
		let childs = this.reduce((p, e) => {
			if (e[1] instanceof Schema) {
				if (e[1][0][1] == "Array") {
					return p + '  ' + e[0].yellow + ": [" + e[1][1][1] + ']\n'
				} else if (e[1][0][1] == "Object") {
					return p + '  ' + e[0].yellow + "(key: String): " + e[1][1][1][0][1] +
						'\n'
				} else {
					childs_type.push(e[1])
					return p + '  ' + e[0].magenta + ": " + e[1][0][1] + "\n"
				}
			} else
				return p + (e == this[0] ? '' : `  ${e[0]}: ${e[1]}`) + "\n"
		}, "")
		return `type ${this[0][1].cyan} {${childs}}\n` + childs_type.reduce((p, e) => {
			return p + e.inspect()
		}, "")
	}
}

const introspect = function(schema) {
	if (!schema) {
		schema = new Schema
		schema.push([, 'Query'])
	}

	Object.keys(this).forEach(k => {
		// console.log(k, this[k])
		if (
			typeof this[k] != 'string' && typeof this[k] != 'number' &&
			typeof this[k] != 'function'
		) {
			let _s = new Schema
			schema.push([k, _s])
			_s.push([k, this[k].constructor.name])
			introspect.call(this[k], _s)
		} else if (typeof this[k] == 'string' || typeof this[k] == 'number') {
			schema.push([k, this[k].constructor.name])
		}
	})
	return schema
}

exports.introspect = introspect
