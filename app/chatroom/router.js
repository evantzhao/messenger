var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('../chatroom/views/chat');
});

module.exports = router;
