import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import { rooms, messages } from './reducers';
import { router } from './middlewares';

const reducer = combineReducers({ rooms, router: routerReducer });

export default createStore(
  reducer,
  messages,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle
  applyMiddleware(router),
);
