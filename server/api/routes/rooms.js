const express = require('express');
const roomsController = require('../controllers/rooms');

// a little bit confused with the names of the endpoints provided as an examples in the README
// also confused with the example for posting message - it says use json body, but the example is using query params
module.exports = express
  .Router()
  .get('/', roomsController.listRooms)
  .get('/get', roomsController.getRoom)
  .post('/createRoom', roomsController.createRoom)
  .post('/post', roomsController.addMessage);
