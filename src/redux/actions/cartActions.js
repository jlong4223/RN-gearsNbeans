import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_ENTIRE_CART,
  ADD_ITEM_QUANTITY,
  SUBTRACT_ITEM_QUANTITY,
} from '~redux/constants';

export const addToCart = product => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = product => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
};

export const clearEntireCart = () => ({
  type: CLEAR_ENTIRE_CART,
});

export const addQuantityToCartItem = product => {
  return {
    type: ADD_ITEM_QUANTITY,
    payload: product,
  };
};
