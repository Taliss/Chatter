const { store } = require('../utils');

module.exports = () => {
  store.clear();
  console.log('persistence store cleared');
};
