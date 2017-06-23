$(function(){
  var socket = io();

  $('form').submit(function(e){
    e.preventDefault();
    console.log($('#m').val());
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});