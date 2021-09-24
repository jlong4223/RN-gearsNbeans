import { GET_REVIEWS, GET_REVIEWS_ERROR } from '../constants';

const initialState = {
  reviews: [],
  error: null,
};

export function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case GET_REVIEWS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    //   TODO will need an add, edit, and delete review case
    default:
      return state;
  }
}
