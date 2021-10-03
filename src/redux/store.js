import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import allReducers from '~redux/reducers/allReducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userData', 'cart'],
};

const persistedReducers = persistReducer(persistConfig, allReducers);

export const store = createStore(
  persistedReducers,
  compose(applyMiddleware(reduxThunk)),
);

export const persistor = persistStore(store);
