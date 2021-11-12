const { listRooms } = require('../api');
const { unexpectedDummyErrorMessage, STORE_KEYS } = require('../constants');
const { throwIfMissingRequiredKey } = require('../utils');

module.exports = async () => {
  try {
    throwIfMissingRequiredKey([STORE_KEYS.address, STORE_KEYS.port]);

    const rooms = await listRooms();
    console.log(`Avaiable rooms: ${rooms.length}`);
    rooms.forEach((room) => console.log(room));
  } catch (error) {
    console.log(error.message || unexpectedDummyErrorMessage);
  }
};
