const { store } = require('../utils');
const { STORE_KEYS } = require('../constants');

module.exports = (username) => {
  store.set(STORE_KEYS.username, username);
};
