var Room = require('../models/chatroom-model').room();
var Account = require('../auth').account;
var mongoose = require('mongoose');

exports.room = Room;

exports.chat_index = function(req, res, next) {
	Room.find({doods: req.user.username}, function(err, rooms) {
		res.render('../chatroom/views/chat', {rooms: rooms});
	});
};

exports.chatroom = function(req, res, next) {
	Room.find({doods: req.user.username}, function(err, rooms) {
		Room.findById(req.params.room_id, function(err, room) {
			res.render('../chatroom/views/chat', 
				{ current_room: room, rooms: rooms });
		});
	});
};

exports.verify = function(req, res, next) {
	req.checkBody('verify', 'Username field is empty').notEmpty();
	req.sanitizeBody('verify').escape();

	var errors = req.validationErrors();

	if(errors) {
		res.render('index', { error: errors });
	} else {
		Account.findOne({"username": req.body.verify}, function(err, user) {
			console.log('here');
			Room.find({doods: req.user.username}, function(err, rooms) {
				if(user) {
					Account.findOne({"username": req.user.username}, function(err, this_guy) {
						var r = new Room({name: user.username, doods: [this_guy.username, user.username], messages: []});
						r.save(function(err, room) {
							res.render('../chatroom/views/chat', {current_room: r, rooms: rooms});
						});
					});
				} else {
					res.render('../chatroom/views/chat', {rooms: rooms, failure: true});
				}	
			});
		});
	}
}