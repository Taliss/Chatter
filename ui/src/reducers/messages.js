
const addNewMessage = (state = [], message) => [ ...state, message ];

const messages = (state = [], { type, message }) => {
  switch (type) {
    case 'ADD_CURRENT_USER_MESSAGE':
      return addNewMessage(state, message);
    case 'MESSAGE_RECEIVED':
      return addNewMessage(state, message);
    default:
      return state;
  }
};

export default messages;
