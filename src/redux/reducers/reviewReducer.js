import {
  GET_REVIEWS,
  GET_ERROR,
  DELETE_REVIEW,
  UPDATE_REVIEW,
} from '~redux/constants';

// TODO add something like filteredReviews: []?
// doing this could potentially make less requests to the server and cut down on constantly updating reviews, when I filter during the action or here and return filteredReviews
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
    case 'FILTER_BY_STAR':
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
}
