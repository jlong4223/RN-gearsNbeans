import { dispatchError } from '~actions/actionHelpers';
import {
  GET_REVIEWS,
  GET_PRODUCTS,
  GET_SERVICES,
  DELETE_REVIEW,
} from '~redux/constants';
import {
  getReviews,
  getProducts,
  getBikeServices,
  postReview,
  deleteReview,
} from '~services/gb-reviews';

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
          payload: res.data,
        });
      })
      .catch(error => {
        dispatchError(dispatch, error);
      });
  };
};

export const deleteUsersReview = id => {
  return async dispatch => {
    await deleteReview(id)
      .then(res => {
        dispatch({
          type: DELETE_REVIEW,
          payload: id,
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
