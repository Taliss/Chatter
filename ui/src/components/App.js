import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import RoomList from './containers/RoomList';
import ChatPanel from './containers/ChatPanel';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const App = () => (
  <ConnectedRouter history={history}>
    <div className="app">
      <RoomList />
      <ChatPanel />
    </div>
  </ConnectedRouter>
);

export default App;
