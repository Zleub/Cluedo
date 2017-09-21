//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-20T20:32:05+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-09-06T20:38:36+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

exports.post = function () {
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
			this.res.writeHead(200, { 'Content-Type': 'application/json' })
			this.res.end( JSON.stringify(response) );

		});
	})

	req.on('error', (e) => {
		console.error(`problem with request: ${e.message}`);
	});

	req.write(postData);
	req.end();
}
