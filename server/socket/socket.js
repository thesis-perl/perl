module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('in socket')
    socket.broadcast.emit('user connected');
    socket.on('code changed', function(data) {
      socket.name = data.name;
      io.sockets.in(socket.room).emit('broadcast', data);
    });

    socket.on('join', function(room) {
      socket.room = room;
      socket.join(room); 
      io.sockets.in(room).emit('joined', room)        
    })

    socket.on('endSession', function() {
      socket.disconnect();  
      console.log('gonna disconnect');
    });

    socket.on('typing', function (data) {
      if(data === socket.name) {
        io.sockets.in(socket.room).emit('typing', data);
      }
    });

    socket.on('untyping', function () {
      io.sockets.in(socket.room).emit('untyping')
    });

    // socket.on('disconnect', function(){
    //   console.log('really disconnect')
    //   // io.j = [];
    //   // io.sockets = [];
    // });
  });
};
