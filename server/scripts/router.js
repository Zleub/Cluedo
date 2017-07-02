//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-22T21:11:45+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-23T18:18:15+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

class Router {
	constructor(routes) {
		this.routes = routes
	}

	matchRoute(req, routes, args = []) {
		return Object.keys(routes).reduce( (p, k) => {
			let match = req.url.match(`^${k}`)
			if (match) {
				let _url = req.url.substr(match[0].length)
				let _f = routes[k][req.method.toLowerCase()]

				if (_url == "" && _f)
					return function () {
						_f.apply(this, args)
					}
				else {
					return this.matchRoute({
						url: _url,
						method: req.method,
						headers: req.headers
					}, routes[k], args)
				}
			}
			return p
		}, null) || Object.keys(routes).reduce( (p, k) => {
			if (k.indexOf(":") == 1) {
				let _url = req.url.match(/\/(\w+)(\/.+)/)
				let _f = routes[k][req.method.toLowerCase()]

				if (_f && _url == null)
					return function () {
						_f.apply(this, args.concat([req.url.substr(1)]))
					}
				else {
					args.push(_url[1])
					return this.matchRoute({
						url: _url != null ? _url[2] : req.url,
						method: req.method,
						headers: req.headers
					}, routes[k], args)
				}
			}

			return p
		}, null)
	}

	dispatch(req, res, callback) {
		if (req.method === 'HEAD') {
			req.method = 'GET'
		}

		let route = this.matchRoute(req, this.routes)

		if (route) {
			route.apply({req, res})
			callback()
		}
		else
			callback(`No such route ${req.method} ${req.url}`)
	}
}

exports.Router = Router
