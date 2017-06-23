module.exports.auth = function() {
	var mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/local');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function() {
		console.log("We're connected to the database!");
	});

	var passport = require('passport');
	var Strategy = require('passport-local').Strategy;

	// Configure the local strategy for use by Passport.
	//
	// The local strategy require a `verify` function which receives the credentials
	// (`username` and `password`) submitted by the user.  The function must verify
	// that the password is correct and then invoke `cb` with a user object, which
	// will be set at `req.user` in route handlers after authentication.
	passport.use(new Strategy(
	  function(username, password, cb) {
	  	console.log(db);
	    db.users.findByUsername(username, function(err, user) {
	    	console.log(username);
	    	if (err) { return cb(err); }
	    	if (!user) { return cb(null, false); }
	    	if (user.password != password) { return cb(null, false); }
	    	return cb(null, user);
	  });
	}));

	return passport;
}
