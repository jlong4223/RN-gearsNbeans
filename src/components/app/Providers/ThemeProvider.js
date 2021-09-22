import React from 'react';
import PropTypes from 'prop-types';
import { NativeBaseProvider } from 'native-base';

import { useTheme } from '../theme';

export default function ThemeProvider({ children }) {
  const theme = useTheme();

  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.any,
};
