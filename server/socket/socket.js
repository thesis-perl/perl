module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('in socket')
    socket.broadcast.emit('user connected');
    socket.on('code changed', function(data) {
      console.log('socket.room', socket.room)
      io.sockets.in(socket.room).emit('broadcast', data);
    });

    socket.on('join', function(room) {
      console.log('get the room name', room)
      socket.room = room;
      socket.join(room); 
      io.sockets.in(room).emit('joined', room)        
    })

    socket.on('endSession', function() {
      socket.disconnect();  
      console.log('gonna disconnect');
    });

    // socket.on('disconnect', function(){
    //   console.log('really disconnect')
    //   // io.j = [];
    //   // io.sockets = [];
    // });
  });
};
