var mongoose = require('mongoose');

var mongoDB = process.env.MONGODB_URI || 'mongodb://localhost/messenger';

mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	console.log("We're connected to the database!");
});
