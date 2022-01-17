import { LOGIN_USER, LOGOUT_USER } from '~redux/constants';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
}
