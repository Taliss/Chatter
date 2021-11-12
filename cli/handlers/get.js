const { store, throwIfMissingRequiredKey, parseMessage } = require('../utils');
const { STORE_KEYS, unexpectedDummyErrorMessage } = require('../constants');
const { getMessages } = require('../api');

module.exports = async (messageCount = 10) => {
  try {
    throwIfMissingRequiredKey([
      STORE_KEYS.address,
      STORE_KEYS.port,
      STORE_KEYS.roomname,
    ]);

    const room = store.get(STORE_KEYS.roomname);
    const response = await getMessages({ room, messageCount });

    response.posts.forEach((post) => {
      console.log(parseMessage({ ...post, room }));
    });
  } catch (error) {
    console.error(error.message || unexpectedDummyErrorMessage);
  }
};
