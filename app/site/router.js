var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = module.exports.account;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../site/views/index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	res.render('../site/views/login');
});

router.post('/login', 
	passport.authenticate(
		'local',
		{ failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/chat');
	}
);

module.exports = router;
