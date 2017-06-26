module.exports.account = function() {
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	// var passportLocalMongoose = require('passport-local-mongoose');

	var Account = new Schema({
	    username: String,
	    password: String
	});

	Account.methods.validPassword = function(password) {
		return (this.password === password);
	};

	// Account.plugin(passportLocalMongoose);

	return mongoose.model('Account', Account);	
}