//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-06T00:43:42+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-23T18:21:37+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

http = require('http')
https = require('https')
querystring = require('querystring')
fs = require('fs')

let { Router } = require('./router.js')

opt = {
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

console.log(opt)

new Promise( (res, rej) => {
	fs.readdir('./server/routes', (err, data) => {
		res( data.reduce( (p, e) => {
			let n = e.match(/(\w+)/)[1]
			p[`/${n}`] = require(`./routes/${e}`)
			return p
		}, {}) )
	})
} ).then( routes => {
	console.log(routes)

	let router = new Router(routes)
	let server = http.createServer(function (req, res) {
		req.chunks = [];
		req.on('data', function (chunk) {
			req.chunks.push(chunk.toString());
		});

		router.dispatch(req, res, function (err) {
			if (err) {
				console.error(err)
				res.writeHead(404);
				res.end();
			}
			else
				console.log('Served ' + req.url);
		});

	});

	server.listen(opt.port, opt.hostname);

	console.log('Server Up')
})
