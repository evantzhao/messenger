$(function(){
  var socket = io();
  $('form').submit(function(){
    console.log($('#m').val());
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});