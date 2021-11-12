module.exports = (io, socket) => {
  const joinUserInRoom = ({ room, user }) => {
    socket.join(room);
    socket.to(room).emit('room:enter:new', { user });
  };
  const sendMessageToRoom = ({ room, user, message }) => {
    socket.to(room).emit('room:message:new', { room, user, message });
  };

  socket.on('room:enter', joinUserInRoom);
  socket.on('room:message', sendMessageToRoom);
};
