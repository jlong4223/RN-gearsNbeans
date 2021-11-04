import {
  GET_REVIEWS,
  GET_ERROR,
  DELETE_REVIEW,
  UPDATE_REVIEW,
} from '~redux/constants';

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
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review =>
          review._id === action.payload._id ? action.payload : review,
        ),
      };
    default:
      return state;
  }
}
