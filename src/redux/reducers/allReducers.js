import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { cartReducer } from '~reducers/cartReducer';
import { reviewReducer } from '~reducers/reviewReducer';
import { productsReducer } from '~reducers/productsReducer';
import { bikeServicesReducer } from '~reducers/bikeServicesReducer';
import { authReducer } from '~reducers/authReducers';
import { errorReducer } from '~reducers/errorReducer';

export default combineReducers({
  form: formReducer,
  cart: cartReducer,
  reviews: reviewReducer,
  products: productsReducer,
  bikeServices: bikeServicesReducer,
  userData: authReducer,
  error: errorReducer,
});
