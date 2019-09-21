const SET_USER = 'SET_USER';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const initialState = {
  user: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
