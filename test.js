//           `--::-.`
//       ./shddddddddhs+.
//     :yddddddddddddddddy:
//   `sdddddddddddddddddddds`
//  /ddddy:oddddddddds:sddddd/   @By: Debray Arnaud <adebray> - adebray@student.42.fr
//  sdddddddddddddddddddddddds   @Last modified by: adebray
//  sdddddddddddddddddddddddds
//  :ddddddddddhyyddddddddddd:   @Created: 2017-06-20T21:44:16+02:00
//   odddddddd/`:-`sdddddddds    @Modified: 2017-06-20T22:27:29+02:00
//    +ddddddh`+dh +dddddddo
//     -sdddddh///sdddddds-
//       .+ydddddddddhs/.
//           .-::::-`

console.log('Starting test.')

const { spawn } = require('child_process');
const assert = require('assert');

const server = spawn('node', [
	'server/main.js',
	'--port', '8000',
	'--hostname', 'localhost'
]);

new Promise( (res, rej) => {

	server.stdout.on('data', (data) => {
		process.stdout.write(`server stdout: ${data}`);
		if (data == "Server Up\n")
			res()
	});

	server.stderr.on('data', (data) => {
		process.stdout.write(`server stderr: ${data}`);
	});

	server.on('close', (code) => {
		// process.stdout.write(`server child process exited with code ${code}`);
	});
}).then( () => {
	new Promise( (res, rej) => {
		const testStory = spawn('curl', [`localhost:8000/story`])

		testStory.stdout.on('data', (data) => {
			process.stdout.write(`testStory stdout: ${data}`);
			assert.strictEqual(data.toString(), "Hello World !\n")
		});

		testStory.stderr.on('data', (data) => {
			// process.stdout.write(`testStory stderr: ${data}`);
		});

		testStory.on('close', (code) => {
			res()
			// console.log(`testStory child process exited with code ${code}`);
		});

	} ).then( () => {
		new Promise( (res, rej) => {
			const testStoryGenerate = spawn('curl', [`localhost:8000/story/generate`])

			testStoryGenerate.stdout.on('data', (data) => {
				process.stdout.write(`testStoryGenerate stdout: ${data}`);
				assert.strictEqual(data.toString(), "Hello World !\n")
			});

			testStoryGenerate.stderr.on('data', (data) => {
				// process.stdout.write(`testStoryGenerate stderr: ${data}`);
			});

			testStoryGenerate.on('close', (code) => {
				server.kill()
				// console.log(`testStoryGenerate child process exited with code ${code}`);
			});
		})
	})


})
