import { dispatchError } from '~actions/actionHelpers';
import {
  GET_REVIEWS,
  GET_PRODUCTS,
  GET_SERVICES,
  DELETE_REVIEW,
  UPDATE_REVIEW,
} from '~redux/constants';
import {
  getReviews,
  getProducts,
  getBikeServices,
  postReview,
  deleteReview,
  updateReview,
} from '~services/gb-reviews';

export const getGBReviews = () => {
  return async dispatch => {
    await getReviews()
      .then(reviews => {
        dispatch({
          type: GET_REVIEWS,
          // payload: reviews.data.reverse(),
          payload: reviews,
        });
      })
      .catch(error => {
        dispatchError(dispatch, error);
      });
  };
};

export const createReview = review => {
  return async dispatch => {
    await postReview(review)
      .then(res => {
        dispatch({
          type: GET_REVIEWS,
          payload: res.data.reverse(),
        });
      })
      .catch(error => {
        dispatchError(dispatch, error);
      });
  };
};

export const deleteUsersReview = review => {
  return async dispatch => {
    await deleteReview(review)
      .then(res => {
        dispatch({
          type: DELETE_REVIEW,
          payload: review._id,
        });
      })
      .catch(error => {
        dispatchError(dispatch, error);
      });
  };
};

export const getGBProducts = () => {
  return async dispatch => {
    await getProducts()
      .then(products => {
        dispatch({
          type: GET_PRODUCTS,
          payload: products.data,
        });
      })
      .catch(error => {
        dispatchError(dispatch, error);
      });
  };
};

export const getGBBikeServices = () => {
  return async dispatch => {
    await getBikeServices()
      .then(products => {
        dispatch({
          type: GET_SERVICES,
          payload: products.data,
        });
      })
      .catch(error => {
        dispatchError(dispatch, error);
      });
  };
};

export const updateReviewObj = review => {
  return async dispatch => {
    await updateReview(review)
      .then(res => {
        dispatch({
          type: UPDATE_REVIEW,
          payload: res.data,
        });
      })
      .catch(error => {
        dispatchError(dispatch, error);
      });
  };
};

export const filterReviews = ({ filter, num = 0 }) => {
  switch (filter) {
    case 'product':
      return async dispatch => {
        const filteredReviews = await getReviews().then(reviews => {
          return reviews.filter(review => {
            return review.reviewType === 'product';
          });
        });
        dispatch({
          type: 'FILTER',
          payload: filteredReviews,
        });
      };

    case 'service':
      return async dispatch => {
        const filteredReviews = await getReviews().then(reviews => {
          return reviews.filter(review => {
            return review.reviewType === 'service';
          });
        });
        dispatch({
          type: 'FILTER',
          payload: filteredReviews,
        });
      };

    case 'num':
      return async dispatch => {
        const filteredStarReviews = await getReviews().then(reviews => {
          return reviews.filter(review => review.stars === num);
        });

        dispatch({
          type: 'FILTER',
          payload: filteredStarReviews,
        });
      };

    default:
      return {
        type: GET_REVIEWS,
      };
  }
};
