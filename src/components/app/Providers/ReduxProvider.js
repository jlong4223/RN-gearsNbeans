import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { store, persistor } from '~redux/store';

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store} persistor={persistor}>
      {children}
    </Provider>
  );
}

ReduxProvider.propTypes = {
  children: PropTypes.any,
};
