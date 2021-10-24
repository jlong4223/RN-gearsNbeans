import { GET_ERROR } from '~redux/constants';

export const dispatchError = (dispatch, error) => {
  dispatch({
    type: GET_ERROR,
    payload: error,
  });
};
