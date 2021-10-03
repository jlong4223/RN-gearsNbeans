import { LOGIN_USER, GET_ERROR } from '~redux/constants';
import { login } from '~services/gb-auth';
import { setToken, getEntireUserFromToken } from '~services/auth-token';

export const loginUser = userDetails => {
  return async dispatch => {
    const response = await login(userDetails);

    if (response.status === 200) {
      const { token } = response.data;

      await setToken(token);
      const userDataFromToken = await getEntireUserFromToken();

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
