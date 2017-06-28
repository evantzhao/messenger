var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
	author: String, 
	content: String
},
{
	timestamps: true
});

module.exports.msg = mongoose.model('Message', Message);
