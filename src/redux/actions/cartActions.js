import { ADD_TO_CART } from '~redux/constants';

export const addToCart = product => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};
