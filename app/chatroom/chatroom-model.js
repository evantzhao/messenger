module.exports.room = function() {
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var Room = new Schema({
		name: String, 
		doods: [String], 
		messages: [{ owner: Number, message: String, timestamp: Date }]
	});

	return mongoose.model('Room', Room);
}