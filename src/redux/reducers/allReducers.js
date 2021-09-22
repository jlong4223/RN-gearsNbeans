import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  replaceMe: () => 5,
  form: formReducer,
});
