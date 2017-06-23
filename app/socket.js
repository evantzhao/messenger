module.exports.listen = function(server) {
    io = require('socket.io')(server);

    io.on('connection', function(socket) {
    	console.log("A user connected");
    	socket.on('chat message', function(msg) {
    		io.emit('chat message', msg);
    		console.log('message: ' + msg);
    	});

    	socket.on('disconnect', function() {
    		console.log("A user disconnected");
    	});
    });

    return io;
}