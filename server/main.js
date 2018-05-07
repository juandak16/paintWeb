var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
	console.log('Alguien se conecto');
	

	socket.on('new-draw', function(data){
		io.sockets.emit('new-draw', data);
		
	});
});


app.get('/hello',(req,res) => {
	res.status(200).send("Hola!");
});

server.listen(4000, () => {
	console.log("Servidor corriendo en http://localhost:4000");
});