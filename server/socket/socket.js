module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('in socket')
    socket.broadcast.emit('user connected');
    socket.on('code changed', function(data) {
      io.sockets.in(socket.room).emit('broadcast', data);
    });

    socket.on('join', function(data) {
      socket.room = data.link;
      socket.name = data.name;
      socket.join(socket.room); 
      io.sockets.in(socket.room).emit('joined', socket.name)        
    })

    socket.on('endSession', function() {
      console.log('socket.room', socket.room);
      socket.leave(socket.room);  
    });

    socket.on('typing', function (data) {
      console.log('typing', data, socket.name)
      if(data === socket.name) {
        io.sockets.in(socket.room).emit('typing', data);
      }
    });

    socket.on('untyping', function () {
      io.sockets.in(socket.room).emit('untyping')
    });
  });
};