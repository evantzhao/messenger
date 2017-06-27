var express = require('express');
var router = express.Router();

// Require controllers
var room_controller = require('./chat-controller');

router.get('/', room_controller.chat_index);

router.post('/', room_controller.verify);

router.get('/:room_id', room_controller.chatroom);

module.exports = router;
