module.exports.auth = function() {
	var mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/test');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function() {
		console.log("We're connected to the database!");
	});

	var passport = require('passport');
	var Strategy = require('passport-local').Strategy;

	var Account = require('./site/account').account();

	// Configure the local strategy for use by Passport.
	//
	// The local strategy require a `verify` function which receives the credentials
	// (`username` and `password`) submitted by the user.  The function must verify
	// that the password is correct and then invoke `cb` with a user object, which
	// will be set at `req.user` in route handlers after authentication.
	passport.use(new Strategy(
	  function(username, password, done) {
	    Account.findOne({ "username": username }, function(err, user) {
	    	if (err) { return done(err); }
	    	if (!user) { return done(null, false, { message: "Incorrect username."} ); }
	    	if (!user.validPassword(password)) { return done(null, false, { message: "Incorrect password." }); }
	    	return done(null, user);
	  });
	}));

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		Account.findById(id, function(err, user) {
			done(err, user);
		});
	});

	exports.account = Account;
	return passport;
}
