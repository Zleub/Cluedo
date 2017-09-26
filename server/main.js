//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-06T00:43:42+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-21T23:49:55+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

require('colors')
const http = require('http')
const https = require('https')
const querystring = require('querystring')
const fs = require('fs')

let { Router } = require('./scripts/router.js')

const opt = {
	port: 8080,
	hostname: "0.0.0.0"
}

process.argv.reduce( (p, e) => {
	if (p == "--token")
		opt.token = e
	if (p == "--port")
		opt.port = Number(e)
	if (p == "--hostname")
		opt.hostname = e
	return e
})

new Promise( (res, rej) => {
	fs.readdir('./server/routes', (err, data) => {
		res( data.reduce( (p, e) => {
			let n = e.match(/^([^.]\w+)/)
			if (!n)
				return p
			p[`/${n[1]}`] = require(`./routes/${e}`)
			return p
		}, {}) )
	})
} ).then( routes => {
	console.log(routes)

	let router = new Router(routes)
	let server = http.createServer(function (req, res) {
		req.chunks = [];

		req.on('data', function (chunk) {
			req.chunks.push(chunk);
		});

		req.on('end', function () {
			if (req.chunks.length > 0) {
				try {
					req.body = JSON.parse( Buffer.concat(req.chunks).toString() ) || {}
				} catch (e) {
					req.body = {}
				}
			}

			router.dispatch(req, res, function (err) {
				if (err) {
					console.error(err)
					res.writeHead(404);
					res.end();
				}
				else
					console.log(`[${req.method}] ${req.url}`.green);
			});
		})


	});

	server.listen(opt.port, opt.hostname);

	console.log('Server Up')
})
