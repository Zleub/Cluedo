//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-22T21:11:45+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-23T15:58:26+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

class Router {
	constructor(routes) {
		this.routes = routes
	}

	matchRoute(req, routes) {
		return Object.keys(routes).reduce( (p, k) => {
			let match = req.url.match(`^${k}`)
			if (match) {
				let _url = req.url.substr(match[0].length)
				let _f = routes[k][req.method.toLowerCase()]

				if (_url == "" && _f)
					return _f
				else {
					return this.matchRoute({
						url: _url,
						method: req.method,
						headers: req.headers
					}, routes[k])
				}
			}
			return p
		}, null) || Object.keys(routes).reduce( (p, k) => {
			if (k.indexOf(":") == 1) {
				let _f = routes[k][req.method.toLowerCase()]

				if (_f)
					return function () {
						_f.call(this, req.url.substr(1))
					}
				else {
					return this.matchRoute({
						url: req.url,
						method: req.method,
						headers: req.headers
					}, routes[k])
				}
			}

			return p
		}, null)
	}

	dispatch(req, res, callback) {
		if (req.method === 'HEAD') {
			req.method = 'GET'
		}
		// console.log(' ---- ')
		// console.log('headers: ', req.headers)
		// console.log('method: ', req.method)
		// console.log('url: ', req.url)

		let route = this.matchRoute(req, this.routes)

		if (route) {
			route.call({req, res})
			callback()
		}
		else
			callback(`No such route ${req.method} ${req.url}`)
	}
}

exports.Router = Router
