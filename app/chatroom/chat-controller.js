var Room = require('./chatroom-model').room();
var mongoose = require('mongoose');


exports.chat_index = function(req, res, next) {
	Room.find({doods: req.user.username}, function(err, rooms) {
		res.render('../chatroom/views/chat', {rooms: rooms});
	});
};

exports.chatroom = function(req, res, next) {
	Room.find({doods: req.user.username}, function(err, rooms) {
		if(err) {
			console.log(err);
		}

		Room.findById(req.params.room_id, function(err, room) {
			console.log(room.name);
			console.log(req.params.room_id);
			res.render('../chatroom/views/chat', 
				{ current_room: room, rooms: rooms });
		});
	});
};