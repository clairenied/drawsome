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
  onNewConnection(socket) {
    
  },
};