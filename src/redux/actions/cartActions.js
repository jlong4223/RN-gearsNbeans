import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_ENTIRE_CART,
  ADD_ITEM_QUANTITY,
  SUBTRACT_ITEM_QUANTITY,
  CHECKOUT_CART,
} from '~redux/constants';

export const checkoutCart = () => {
  return async (dispatch, getState) => {
    const { cart } = getState();

    // want to update api here to add the cart to previous orders & send back a success message; if it is a success, than dispatch below
    dispatch({
      type: CHECKOUT_CART,
      payload: cart,
    });
  };
};

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

export const removeQuantityFromCartItem = product => {
  return {
    type: SUBTRACT_ITEM_QUANTITY,
    payload: product,
  };
};
