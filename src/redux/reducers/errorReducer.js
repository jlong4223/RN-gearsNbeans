import { GET_ERROR } from '~redux/constants';

const initialState = {
  error: null,
  errorFound: false,
};

export function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERROR:
      console.log('errorReducer: action.payload: get error');
      return {
        ...state,
        error: action.payload,
        errorFound: true,
      };
    case 'CLEAR_ERROR':
      console.log('errorReducer action.type ');
      return {
        ...state,
        error: null,
        errorFound: false,
      };
    default:
      return state;
  }
}
