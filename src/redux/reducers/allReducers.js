import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { cartReducer } from './cart';

export default combineReducers({
  replaceMe: () => 5,
  form: formReducer,
  cart: cartReducer,
});
