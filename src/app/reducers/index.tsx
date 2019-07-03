import { createStore, combineReducers } from 'redux';
import tokens, { IToken } from './tokens';

export interface IState {
  tokens: IToken
}

const rootReducer = combineReducers({
  tokens
});

export default createStore(rootReducer);
