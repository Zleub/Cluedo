//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-06T00:43:42+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-06T00:58:09+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

var http = require('http'),
	director = require('director');

var server = http.createServer(function (req, res) {
	console.log("serving")
	// router.dispatch(req, res, function (err) {
		// if (err) {
			// res.writeHead(404);
			res.end("Hello World !");
		// }
	// });
});

server.listen(8080);
