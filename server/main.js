//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-06T00:43:42+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-06T16:31:24+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

let opt = {}

process.argv.reduce( (p, e) => {
	if (p == "--token")
		opt.token = e
	return e
})

console.log(opt)

var http = require('http'),
	https = require('https'),
	querystring = require('querystring'),
	director = require('director')

var router = new director.http.Router({
	'/test': {
		post: function () {
			let postData = querystring.stringify({
				"text": this.req.body.text,
				"language": "en"
			});

			let options = {
				hostname: "api.recast.ai",
				path: "/v2/request",
				method: "POST",
				headers: {
					'Authorization': `Token ${opt.token}`,
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': Buffer.byteLength(postData)
				}
			}

			let req = https.request(options, (res) => {
				let response = ""

				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					response += chunk;
				});
				res.on('end', () => {
					console.log(response);
					this.res.writeHead(200, { 'Content-Type': 'application/json' })
					this.res.end(JSON.stringify(response));

				});
			})

			req.on('error', (e) => {
				console.error(`problem with request: ${e.message}`);
			});

			req.write(postData);
			req.end();
		}
	}
});

var server = http.createServer(function (req, res) {
	req.chunks = [];
    req.on('data', function (chunk) {
      req.chunks.push(chunk.toString());
    });

	router.dispatch(req, res, function (err) {
		if (err) {
			res.writeHead(404);
			res.end();
		}
	});

	console.log('Served ' + req.url);
});

server.listen(8080);
