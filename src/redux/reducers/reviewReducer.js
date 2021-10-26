import { GET_REVIEWS, GET_ERROR, DELETE_REVIEW } from '~redux/constants';

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
    case GET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== action.payload),
      };
    //   TODO will need an add, edit, and delete review case
    default:
      return state;
  }
}
