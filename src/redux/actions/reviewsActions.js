import { getReviews } from '~services/gb-reviews';
import { GET_REVIEWS, GET_REVIEWS_ERROR } from '~redux/constants';

export const getGBReviews = () => {
  return async dispatch => {
    await getReviews()
      .then(reviews => {
        dispatch({
          type: GET_REVIEWS,
          payload: reviews.data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REVIEWS_ERROR,
          payload: error,
        });
      });
  };
};
