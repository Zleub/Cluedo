//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-22T21:26:10+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-23T18:19:01+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

const { spawn, spawnSync } = require('child_process');
const assert = require('assert');

module.exports = () => {
	let server
	new Promise( (res, rej) => {
		server = spawn('node', [
			'server/main.js',
			'--port', '8000',
			'--hostname', 'localhost'
		]);

		server.stdout.on('data', (data) => {
			process.stdout.write(`\nserver stdout:\n${data}`);
			if (data == "Server Up\n")
				res()
		});

		server.stderr.on('data', (data) => {
			process.stdout.write(`server stderr:\n${data}`);
		});

		server.on('close', (code) => {
			process.stdout.write(`server child process exited with code ${code}`);
		});
	}).then( () => {
		const tests = [
			{
				url: '', code: 404,
				response: ''
			}, {
				url: '/story', code: 200,
				response: "Hello story get !\n"
			}, {
				url: '/story/test', code: 200,
				response: "Hello story/param <test> get !\n"
			}, {
				url: '/story/test/adebray', code: 200,
				response: "Hello story/:param/adebray <test> get !\n"
			}, {
				url: '/story/test/generate', code: 200,
				response: "Hello story/more_param <test> <generate> get !\n"
			}, {
				url: '/story/generate', code: 200,
				response: "Hello story/generate get !\n"
			}, {
				url: '/generate', code: 200,
				response: "Hello generate get !\n"
			}
		]

		let exit = (code) => {
			server.kill()
			process.exit(code)
		}

		let testCode = (e) => {
			const {stdout, stderr, status} = spawnSync('curl', ['-I', `localhost:8000${e.url}`])
			let code = stdout.toString().match(/HTTP\/.\..\s(\d+)/)[1]

			try {
				assert.equal(code, e.code)
			} catch (_) {
				console.error(`Assert fail: ${e.url} ${_.message.toString()}`)
				exit(1)
			}
		}

		let testResponse = (e) => {
			const {stdout, stderr, status} = spawnSync('curl', [`localhost:8000${e.url}`])
			try {
				assert.equal(stdout.toString(), e.response)
			} catch (_) {
				console.error(`Assert fail: ${e.url} ${_.message.toString()}`)
				exit(1)
			}
		}

		tests.forEach( e => {
			testCode(e)
			testResponse(e)
		})
		exit(0)
	})
}
