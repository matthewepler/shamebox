var socket = require('socket.io-client')('http://shamebox.herokuapp.com');

socket.on('connect', function() {
	console.log('yay, connected!');
	socket.send('hello');
});

socket.on('shame', function(data) {
	console.log('data rcvd: ');
	console.log(data);
});
