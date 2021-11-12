const { store } = require('../utils');

module.exports = () => {
  console.log(JSON.stringify(store.store, null, 2));
};
