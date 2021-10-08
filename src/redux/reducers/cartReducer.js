import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_ENTIRE_CART,
  ADD_ITEM_QUANTITY,
  SUBTRACT_ITEM_QUANTITY,
} from '~redux/constants';

const initialState = {
  cart: [],
  total: 0,
  itemCount: 0,
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      // check to see if the item is already in the cart
      const itemInCart = state.cart.find(
        item => item._id === action.payload._id,
      );

      if (itemInCart) {
        // if it is, increase the quantity
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
          total: state.total + action.payload.price,
          itemCount: state.itemCount + 1,
        };
      }
      // if it isn't, add it to the cart
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
        itemCount: state.itemCount + 1,
      };

    case ADD_ITEM_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
        total: state.total + action.payload.price,
        itemCount: state.itemCount + 1,
      };

    case SUBTRACT_ITEM_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
        total: state.total - action.payload.price,
        itemCount: state.itemCount - 1,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload._id),
        total: state.total - action.payload.price * action.payload.quantity,
        itemCount: state.itemCount - action.payload.quantity,
      };
    case CLEAR_ENTIRE_CART:
      return {
        ...state,
        cart: [],
        total: 0,
        itemCount: 0,
      };
    default:
      return state;
  }
}
