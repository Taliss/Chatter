import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import classnames from 'classnames';
import '../../stylings/RoomList.css';

const RoomList = ({ rooms }) => {
  const renderRoomName = ({ name }) => (
    <li
      key={name}
      className={classnames('room-item', { 'global-room': name === 'global' })}
    >
      {name}
    </li>
  );

  return (
    <ul className="rooms-container">
      {R.map(renderRoomName, R.values(rooms))}
    </ul>
  );
};

export default connect(
  state => ({
    rooms: state.rooms,
  }),
)(RoomList);
