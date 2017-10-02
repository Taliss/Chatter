import React from 'react';
import { connect } from 'react-redux';


const ChatPanel = ({ messages }) => (
  <div className="chat-panel">
    {messages.map(message => (
      <h3 className="chat-message">{message}</h3>
    ))}

  </div>
);

export default connect(
  state => ({
    messages: state.messages,
  }),
)(ChatPanel);

