const httpErrors = {
  HTTP_NOT_FOUND: {
    status: 404,
    message: 'Not Found',
  },
  HTTP_BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
  },
};

const customErrors = {
  roomNameConstraint: { message: 'Room name already taken.' },
  roomDoesNotExist: { message: 'Room does not exist.' },
};

module.exports = {
  httpErrors,
  customErrors,
};
