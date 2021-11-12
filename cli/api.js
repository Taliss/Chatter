const { request, store } = require('./utils');
const { STORE_KEYS } = require('./constants');

// no need of error handling, just let them...pop
const healthcheck = async () => {
  return request({
    host: store.get(STORE_KEYS.address),
    port: store.get(STORE_KEYS.port),
    headers: { 'Content-Type': 'application/json' },
    path: '/api/healthcheck',
  });
};

const listRooms = async () => {
  return request({
    host: store.get(STORE_KEYS.address),
    port: store.get(STORE_KEYS.port),
    headers: { 'Content-Type': 'application/json' },
    path: '/api/rooms',
  });
};

const getMessages = async ({ room, messageCount }) => {
  const params = new URLSearchParams();
  params.append('name', room);
  params.append('limit', messageCount);
  params.toString();
  try {
    const room = await request({
      host: store.get(STORE_KEYS.address),
      port: store.get(STORE_KEYS.port),
      headers: { 'Content-Type': 'application/json' },
      path: `/api/rooms/get?${params}`,
    });
    return room;
  } catch (err) {
    return err.status === 404
      ? Promise.reject({
          message: 'Room not found, check existing rooms with `list` command',
        })
      : Promise.reject(err.message);
  }
};

const postMessage = async ({ room, message, user }) => {
  return request(
    {
      host: store.get(STORE_KEYS.address),
      port: store.get(STORE_KEYS.port),
      headers: { 'Content-Type': 'application/json' },
      path: '/api/rooms/post',
      method: 'POST',
    },
    { room, user, msg: message }
  );
};

const createRoom = async ({ name }) => {
  const params = new URLSearchParams();
  params.append('name', name);
  params.toString();
  return request({
    host: store.get(STORE_KEYS.address),
    port: store.get(STORE_KEYS.port),
    headers: { 'Content-Type': 'application/json' },
    path: `/api/rooms/createRoom?${params}`,
    method: 'POST',
  });
};

module.exports = {
  createRoom,
  postMessage,
  healthcheck,
  listRooms,
  getMessages,
};
