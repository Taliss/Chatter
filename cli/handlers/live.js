const { io } = require('socket.io-client');
const repl = require('repl');
const { store, throwIfMissingRequiredKey } = require('../utils');
const { STORE_KEYS } = require('../constants');
const { getMessages } = require('../api');

module.exports = async () => {
  // will throw if command arguments are not set
  try {
    throwIfMissingRequiredKey([
      STORE_KEYS.address,
      STORE_KEYS.port,
      STORE_KEYS.roomname,
      STORE_KEYS.username,
    ]);

    const room = await getMessages({
      room: store.get(STORE_KEYS.roomname),
      messageCount: 1,
    });

    // if store is configured and room exists, join
    const socket = io(
      `http://${store.get(STORE_KEYS.address)}:${store.get(STORE_KEYS.port)}`
    );
    socket.on('connect', () => {
      console.log('Welcome to Chatter');
    });

    socket.emit('room:enter', {
      room: store.get(STORE_KEYS.roomname),
      user: store.get(STORE_KEYS.username),
    });

    socket.on('room:message:new', ({ room, user, message }) => {
      console.log(room, ' - ', user, ' - ', message);
    });

    socket.on('room:enter:new', ({ user }) => {
      console.log(`${user} has joined the room`);
    });

    socket.on('room:message', (cmd) => {
      console.log(cmd, ' i oshte neshto :P');
    });

    socket.on('disconect', () => {
      console.log('Disconnected: leaving chat room');
    });

    socket.on('connect_error', (err) => {
      console.log('Connection error: ', err.message);
    });

    repl.start({
      prompt: '> ',
      eval: (cmd) => {
        socket.emit('room:message', cmd);
      },
    });
  } catch (error) {
    console.error(error.message, 'tuka');
  }
};
