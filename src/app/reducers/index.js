import { createStore, combineReducers } from 'redux';
import tokens from './tokens';
import users from './users';

const rootReducer = combineReducers({
  tokens,
  users
});

export default createStore(rootReducer);
