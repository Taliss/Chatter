const { store, parseToInt } = require('../utils');
const { healthcheck } = require('../api');
const { STORE_KEYS, unexpectedDummyErrorMessage } = require('../constants');

module.exports = async (address, options) => {
  try {
    // this can throw
    const port = parseToInt(options.port);

    store.set(STORE_KEYS.address, address);
    store.set(STORE_KEYS.port, port);
    const response = await healthcheck();
    console.log(`
      Connection established.
      Healthcheck status: ${response.status}`);
  } catch (error) {
    console.error(error.message || unexpectedDummyErrorMessage);
  }
};
