import { createStore, combineReducers } from 'redux';
import tokens from './tokens';

const rootReducer = combineReducers({
  tokens
});

export default createStore(rootReducer);
