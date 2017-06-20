//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-06T00:43:42+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-20T21:02:00+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

http = require('http')
https = require('https')
querystring = require('querystring')
fs = require('fs')
director = require('director')

opt = {}

process.argv.reduce( (p, e) => {
	if (p == "--token")
		opt.token = e
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

	let router = new director.http.Router(routes)

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
		});

		console.log('Served ' + req.url);
	});

	server.listen(8080);
})
