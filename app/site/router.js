var express = require('express');
var router = express.Router();
var passport = require('passport');

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
		{ 	failureRedirect: '/login',
			successRedirect: '/chat' }));

module.exports = router;
