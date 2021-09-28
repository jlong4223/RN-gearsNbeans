import { GET_PRODUCTS, GET_PRODUCTS_ERROR } from '~redux/constants';

const initialState = {
  products: [],
  error: null,
};

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
