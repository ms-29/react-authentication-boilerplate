import { createStore, combineReducers } from 'redux';
import token from './token';

const rootReducer = combineReducers({
  token
});

export default createStore(rootReducer);
