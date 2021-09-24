import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { cartReducer } from '~reducers/cart';
import { reviewReducer } from '~reducers/reviewReducer';

export default combineReducers({
  form: formReducer,
  cart: cartReducer,
  reviews: reviewReducer,
});
