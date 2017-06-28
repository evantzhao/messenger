var express = require('express');
var router = express.Router();
var message = require('./models/messages');
var Message = message.msg;

var room_controller = require('./controllers/chat-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/index', { title: 'Express' });
});

router.get('/chat', function(req, res, next) {
	var session = req.session;

	if(session.user) {
		Message.find().sort('-createdAt').limit(50).exec(function(err, history){
			res.render('../views/chat', { history: history, current: session.user });
		});
	} else {
		res.render('../views/login');
	}
});

router.post('/chat', function(req, res, next) {
	var session = req.session;

	Message.find().sort('-createdAt').limit(50).exec(function(err, history) {
		if(!session.user) {
			session.user = req.body.username;
		}
		res.render('../views/chat', { history: history, current: session.user });
	});
});

router.post('/logout', function(req, res, next) {
	req.session.destroy();
	res.render('../views/index');
});

router.get('/chat/user', function(req, res, next) {
	var session = req.session;
	res.json({username: session.user});
});

module.exports = router;
