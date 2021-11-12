const { store, throwIfMissingRequiredKey } = require('../utils');
const { postMessage } = require('../api');
const { STORE_KEYS, unexpectedDummyErrorMessage } = require('../constants');

module.exports = async (message) => {
  try {
    throwIfMissingRequiredKey([
      STORE_KEYS.address,
      STORE_KEYS.port,
      STORE_KEYS.username,
      STORE_KEYS.roomname,
    ]);

    const response = await postMessage({
      room: store.get(STORE_KEYS.roomname),
      user: store.get(STORE_KEYS.username),
      message,
    });
    console.log('Message send');
  } catch (error) {
    console.error(error.message || unexpectedDummyErrorMessage);
  }
};
