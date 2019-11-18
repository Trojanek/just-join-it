import { combineReducers } from 'redux';
import offersReducer from './offersReducer';

const rootReducer = combineReducers({
  offersReducer,
});

export default rootReducer;
