$(function(){
  var socket = io();

  $('form#messaging').submit(function(e) {
    e.preventDefault();

    $.getJSON( "chat/user", function( data ) {
    	var username = data.username;
    	socket.emit('chat message', { content: $('#m').val(), author: username });
    	$('#m').val('');
	   });
  });

  socket.on('chat message', function(msg) {
    $.getJSON( "chat/user", function( data ) {
      var username = data.username;

      if(username == msg.author) {
        $('#messages').append($('<li class="self">').append($('<p class="msg">').text(msg.content)).append($('<p class="tiny sel">').text(msg.author)));
      } else {
        $('#messages').append($('<li class="other">').append($('<p class="msg">').text(msg.content)).append($('<p class="tiny oth">').text(msg.author)));
      }
    });
  });
});