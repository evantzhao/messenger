module.exports.listen = function(server, Message) {
    var io = require('socket.io')(server);

    io.on('connection', function(socket) {
    	console.log("A user connected");
    	socket.on('chat message', function(msg) {

            var mongoMsg = new Message({ author: msg.author, content: msg.content });
            mongoMsg.save(function(err, msg) {
                if(err) {
                    console.log("error: " + err);
                } else {
                    io.emit('chat message', {content: msg.content, author: msg.author});
                }
            });

            Message.find().sort('-createdAt').exec(function(err, history) {
                if(history.length > 55) {
                    var time_cap = history[51]._id.getTimestamp();
                    Message.find({
                        "createdAt": { "$lte" : time_cap }
                    }, function(err, res) {
                        for(var i in res) {
                            res[i].remove();
                        }                    
                    });
                }
            });
        });

    	socket.on('disconnect', function() {
    		console.log("A user disconnected");
    	});
    });

    return io;
}