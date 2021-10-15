import {
  getReviews,
  getProducts,
  getBikeServices,
  postReview,
} from '~services/gb-reviews';

import {
  GET_REVIEWS,
  GET_PRODUCTS,
  GET_SERVICES,
  GET_ERROR,
} from '~redux/constants';

const dispatchError = (dispatch, error) => {
  dispatch({
    type: GET_ERROR,
    payload: error,
  });
};

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
