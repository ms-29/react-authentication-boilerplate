const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token
});

const initialState = {
  token: undefined
};

export default (state = initialState, action) => {
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
