import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import allReducers from '../../../redux/reducers/allReducers';

const store = createStore(allReducers, compose(applyMiddleware(reduxThunk)));

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
