import React from 'react';
import { connect } from 'react-redux';
import MessageInput from './MessageInput';
import '../../stylings/ChatPanel.css';

const ChatPanel = ({ messages }) => (
  <div className="chat-panel">
    {messages.map((message, i) => (
      <h3 className="chat-message" key={i}>{message}</h3>
    ))}
    <div className="message-input-wrapper">
      <MessageInput />
    </div>
  </div>
);

export default connect(
  state => ({
    messages: state.messages,
  }),
)(ChatPanel);

