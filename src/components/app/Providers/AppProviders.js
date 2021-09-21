import React from 'react';
import ThemeProvider from './ThemeProvider';

export default function AppProviders({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
