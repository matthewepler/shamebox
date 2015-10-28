/*  
SHAMEBOX - server code

this app lives in the cloud (heroku, etc.)
it will receive a post request from Slack using their slash API
when a new request is received, it emits a 'shame' event to any connected socket
that socket should respond with its actuators, and maybe(?) give a success response when done
*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var person = "olegmoshkovich"

app.get('/', function(req, res) {
	res.send("Shame on you, @" + person);
});

app.get('/shame', function(req, res) { 
	var comeback = req.query.text;
	var data = {
		'comeback' : comeback,
		'shamer' : req.query.user_name,
		'person' : person
	};
	io.emit('shame', data);
	res.send('emitting shame to @' + person + ": " + comeback);
});

var port = process.env.PORT || 3000;
http.listen(port, function() {
	console.log('listening on *:' + port);
});

io.on('connection', function(socket) {
	console.log('user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('hello', function() {
		console.log('i hear you.');
	});
});



