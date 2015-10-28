var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/shame', function(req, res) {
	res.sendFile(__dirname + '/index.html');
	var data = {
		'text' : 'emitting shame'
	};
	io.emit('shame', data);
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});

io.on('connection', function(socket) {
	console.log('user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});


