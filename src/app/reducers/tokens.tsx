import { AnyAction } from 'redux';

const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token
});

export interface IToken {
  token?: string;
}

const initialState: IToken = {
  token: undefined
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};
