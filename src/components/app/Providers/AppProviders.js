import React from 'react';
import ThemeProvider from './ThemeProvider';
import ReduxProvider from './ReduxProvider';

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </ThemeProvider>
  );
}
