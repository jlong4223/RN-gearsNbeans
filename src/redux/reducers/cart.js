const initialState = {
  cart: [],
  total: 0,
  itemCount: 0,
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CART_ITEM_COUNT':
      return { ...state, itemCount: action.payload };
    default:
      return state;
  }
}
