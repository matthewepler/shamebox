var socket = require('socket.io-client')('http://shamebox.herokuapp.com');
var exec = require('child_process').exec;
var GPIO = require('onoff').Gpio,
	led  = new GPIO(17, 'out');

socket.on('connect', function() {
	console.log('yay, connected!');
	socket.send('hello');
	led.writeSync(1);
});

socket.on('disconnect', function() {
	led.writeSync(0);
});

socket.on('shame', function(data) {
	console.log('data rcvd: ');
	console.log(data);
	exec("omxplayer /home/pi/shamebox/client/womp.mp3", function (error, stdout, stderr) {
		console.log(stdout.toString('utf8'));
		console.log(stderr.toString('utf8'));
		if (error) {
			console.log("ERROR: ");
			console.log(error);
		}
	});
});

process.stdin.resume();

function exitHandler(options, err) {
	led.writeSync(0);
	if (options.cleanup) console.log('clean');
	if (err) console.log(err.stack);
	if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

