import { LOGIN_USER, LOGOUT_USER } from '~redux/constants';
import { login, register } from '~services/gb-auth';
import { setBaseRoot } from '~app/navigation';
import { dispatchError } from '~actions/actionHelpers';
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

    dispatchError(dispatch, {
      message: response,
      action: 'loginUser',
      unauthorized: true,
    });
  };
};

export const registerUser = userDetails => {
  return async dispatch => {
    const response = await register(userDetails).catch(err => {
      dispatchError(dispatch, err);
    });

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
  };
};

export const logoutUser = () => {
  removeAuthToken();
  return {
    type: LOGOUT_USER,
  };
};
