const config = require('config');
const http = require('http');
const { Server } = require('socket.io');

const registerRoomHandlers = require('./handlers/room-handler');
const app = require('./api/app');
const { establishDBConnection } = require('./db');

const server = http.createServer(app);
const io = new Server(server);

const port = config.get('server.port');

io.on('connection', (socket) => {
  registerRoomHandlers(io, socket);
});

server.listen(port, async () => {
  console.log(`Up and running on port: ${port}`);
  try {
    await establishDBConnection();
  } catch (err) {
    // some retry logic here maybe
    console.error(`Error stablishing connection to the DB: ${err}`);
  }
});
