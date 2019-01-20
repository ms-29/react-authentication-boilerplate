import { AnyAction } from 'redux';

const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token
});

const initialState = {
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
