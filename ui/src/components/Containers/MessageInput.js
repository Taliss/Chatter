import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class MessageInput extends PureComponent {
  constructor(props) {
    super(props);
    this.inputHandler = this.inputHandler.bind(this);
    this.handleKeyPres = this.handleKeyPres.bind(this);
    this.state = { message: '' };
  }

  inputHandler(e) {
    this.setState({ message: e.target.value });
  }

  handleKeyPres(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (this.state.message.trim()) {
        this.props.addMessage(this.state.message);
        this.setState(() => ({ message: '' }));
      }
    }
  }

  render() {
    return (
      <textarea
        value={this.state.message}
        type="text"
        placeholder="Write message"
        onKeyPress={this.handleKeyPres}
        onChange={this.inputHandler}
        className="message-input"
      />
    );
  }
}

export default connect(
  null,
  dispatch => ({
    addMessage: message => dispatch({
      type: 'ADD_CURRENT_USER_MESSAGE',
      message,
    }),
  }),
)(MessageInput);
