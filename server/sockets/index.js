const sockets = {
  io: {}
};

module.exports = {
  setIO(server) {
    sockets.io = require('socket.io')(server);
  },
  get io() {
    return sockets.io;
  },
  listenForConnections(socket){
    socket.on('new-chat', version => {
      return socket.broadcast.emit('new-chat', version)
    })
  },
};