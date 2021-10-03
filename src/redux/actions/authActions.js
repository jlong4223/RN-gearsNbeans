import { LOGIN_USER, LOGOUT_USER, GET_ERROR } from '~redux/constants';
import { login } from '~services/gb-auth';
import { setBaseRoot } from '~app/navigation';
import {
  setToken,
  getEntireUserFromToken,
  removeAuthToken,
} from '~services/auth-token';

export const loginUser = userDetails => {
  return async dispatch => {
    const response = await login(userDetails);

    if (response.status === 200) {
      const { token } = response.data;

      await setToken(token);
      const userDataFromToken = await getEntireUserFromToken();

      setBaseRoot();

      dispatch({
        type: LOGIN_USER,
        payload: userDataFromToken,
      });
    }

    dispatch({
      type: GET_ERROR,
      payload: response.data.message,
    });
  };
};

export const logoutUser = () => {
  removeAuthToken();
  return {
    type: LOGOUT_USER,
  };
};
