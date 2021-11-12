const rooms = require('../models/rooms');
const { httpErrors, customErrors } = require('../../constants');

const createRoom = async (req, res, next) => {
  try {
    const { name } = req.query;
    await rooms.insert({ name });
    res.status(201).json({ message: 'OK' });
  } catch (error) {
    if (error && error.message === customErrors.roomNameConstraint.message) {
      next({
        status: httpErrors.HTTP_BAD_REQUEST.status,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
};

const listRooms = async (_req, res, next) => {
  try {
    const avaiableRooms = await rooms.list();
    res.status(200).json(avaiableRooms);
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const { name, limit } = req.query;
    const room = await rooms.find({ name, limit: limit || 20 });

    room ? res.json(room) : next(httpErrors.HTTP_NOT_FOUND);
  } catch (error) {
    next(error);
  }
};

const addMessage = async (req, res, next) => {
  try {
    const { room, user, msg } = req.body;
    await rooms.insertMessage({ room, user, msg });

    res.status(200).json({ message: 'OK' });
  } catch (error) {
    if (error && error.message === customErrors.roomDoesNotExist.message) {
      next({
        status: httpErrors.HTTP_BAD_REQUEST.status,
        message: error.message,
      });
    } else {
      next(error);
    }
  }
};

module.exports = {
  createRoom,
  listRooms,
  getRoom,
  addMessage,
};
