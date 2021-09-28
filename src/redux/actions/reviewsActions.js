import { getReviews, getProducts } from '~services/gb-reviews';
import {
  GET_REVIEWS,
  GET_REVIEWS_ERROR,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
} from '~redux/constants';

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
        dispatch({
          type: GET_PRODUCTS_ERROR,
          payload: error,
        });
      });
  };
};
