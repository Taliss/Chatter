const { store } = require('../utils');
const { STORE_KEYS } = require('../constants');

module.exports = (roomname) => {
  store.set(STORE_KEYS.roomname, roomname);
};
