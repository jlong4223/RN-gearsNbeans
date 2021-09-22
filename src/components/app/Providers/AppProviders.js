import React from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from './ThemeProvider';
import ReduxProvider from './ReduxProvider';

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </ThemeProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.any,
};
