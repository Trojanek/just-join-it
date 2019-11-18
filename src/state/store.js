import {
  createStore,
  applyMiddleware,
} from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    thunk,
    promise,
  ),
);

export default store;
