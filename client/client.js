var socket = require('socket.io-client')('http://shamebox.herokuapp.com');
var exec = require('child_process').exec;

socket.on('connect', function() {
	console.log('yay, connected!');
	socket.send('hello');
});

socket.on('shame', function(data) {
	console.log('data rcvd: ');
	console.log(data);
	exec("omxplayer audio.mp3", function (error, stdout, stderr) {
		console.log(stdout.toString('utf8');
		console.log(stderr.toString('utf8');
		if (error) {
			console.log("ERROR: ");
			console.log(error);
		}
	});
});
