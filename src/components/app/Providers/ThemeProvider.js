import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { useTheme } from '../theme';

export default function ThemeProvider({ children }) {
  const theme = useTheme();

  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
}
