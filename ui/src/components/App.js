import React, { Component } from 'react';
import RoomList from './Containers/RoomList';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="app">
          <RoomList />
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
