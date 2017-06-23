var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../site/views/index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	res.render('../site/views/login');
});

module.exports = router;
