module.exports.room = function() {
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var Room = new Schema({
		name: String, 
		doods: [String], 
		messages: [{ owner: Number, message: String, timestamp: Date, default: Date.now }]
	});

	return mongoose.model('Room', Room);
}