var Room = require('./chatroom-model').room();

exports.chat_index = function(req, res, next) {
	Room.find({doods: req.user.username}, function(err, rooms) {
		res.render('../chatroom/views/chat', {rooms: rooms});
	});
};

exports.chatroom = function(req, res, next) {
	Room.find({doods: req.user.username}, function(err, rooms) {
		Room.find(ObjectId(req.params.room_id), function(err, room) {
			res.render('../chatroom/views/chat', 
				{ current_room: room, rooms: rooms });
		});
	});
};