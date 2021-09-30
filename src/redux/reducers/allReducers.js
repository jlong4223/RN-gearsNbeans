import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { cartReducer } from '~reducers/cart';
import { reviewReducer } from '~reducers/reviewReducer';
import { productsReducer } from '~reducers/productsReducer';
import { bikeServicesReducer } from '~reducers/bikeServicesReducer';

export default combineReducers({
  form: formReducer,
  cart: cartReducer,
  reviews: reviewReducer,
  products: productsReducer,
  bikeServices: bikeServicesReducer,
});
