const { createRoom } = require('../api');
const { unexpectedDummyErrorMessage, STORE_KEYS } = require('../constants');
const { throwIfMissingRequiredKey } = require('../utils');

module.exports = async (name) => {
  try {
    throwIfMissingRequiredKey([STORE_KEYS.address, STORE_KEYS.port]);

    const response = await createRoom({ name });
    console.log(`Room created: ${name}`);
  } catch (error) {
    console.error(error.message || unexpectedDummyErrorMessage);
  }
};
