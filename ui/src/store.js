import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import rooms  from './reducers/rooms';
import { router } from './middlewares' ;

const reducer = combineReducers({ rooms, router: routerReducer });

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(router)
);