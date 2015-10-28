var socket = require('socket.io-client')('http://10.8.81.245:3000/');

socket.on('connect', function() {
	console.log('yay, connected!');
	socket.send('hello');
});

socket.on('shame', function(data) {
	console.log('data rcvd: ');
	console.log(data);
});
