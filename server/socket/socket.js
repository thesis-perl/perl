module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('in socket')
    socket.broadcast.emit('user connected');
    socket.on('code changed', function(code) {
      io.sockets.emit('broadcast', code);
    });
  });
};
