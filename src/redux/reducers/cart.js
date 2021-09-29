import { ADD_TO_CART } from '~redux/constants';

const initialState = {
  cart: [],
  total: 0,
  itemCount: 0,
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total: state.total + action.payload.price,
        itemCount: state.itemCount + 1,
      };
    default:
      return state;
  }
}
