const { collection } = require('../../db/');
const { customErrors } = require('../../constants/');

// constant for rooms collection
const ROOMS = 'rooms';

const insert = async ({ name }) => {
  const room = await collection(ROOMS).findOne({ name });

  // I wanted to use unique indexes, but the setup is more complicated
  if (room) {
    return Promise.reject(customErrors.roomNameConstraint);
  }

  return collection(ROOMS).insertOne({ name, posts: [] });
};

const list = async () => {
  return collection(ROOMS)
    .find()
    .project({ name: 1, _id: 0 })
    .map((room) => room.name)
    .toArray();
};

// todo fix this
const find = async ({ name, limit }) => {
  return collection(ROOMS).findOne(
    { name },
    { projection: { _id: 0, posts: { $slice: -limit } } }
  );
};

const insertMessage = async ({ room, msg, user }) => {
  // I can't figure out how to use mongoDB current date with push
  const roomPost = { msg, user, created: Date.now() };

  const { value } = await collection(ROOMS).findOneAndUpdate(
    { name: room },
    {
      $push: { posts: { $each: [roomPost], $slice: -100 } },
    }
  );

  // maybe the update document can be returned here
  return value ? 'OK' : Promise.reject(customErrors.roomDoesNotExist);
};

module.exports = {
  insert,
  list,
  find,
  insertMessage,
};
