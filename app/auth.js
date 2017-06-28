module.exports.auth = function() {
	var mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/test');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function() {
		console.log("We're connected to the database!");
	});

	var Account = require('./models/account').account();

	exports.account = Account;
}
