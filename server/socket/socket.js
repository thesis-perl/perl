module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('in socket')
    socket.broadcast.emit('user connected');
    socket.on('code changed', function(code) {
      console.log('code line 6', typeof code)
      io.sockets.emit('broadcast', code);
    })

    socket.on('message', function (msg) {

      console.log('recieved message msg', JSON.stringify(msg));
      io.sockets.emit('broadcast', msg);
      console.log('broadcast complete');
    });
  });
};
