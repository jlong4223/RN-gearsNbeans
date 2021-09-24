import React from 'react';
import AppProviders from '~app/Providers/AppProviders';
import { Navigation } from 'react-native-navigation';
import { withNavigationProvider } from 'react-native-navigation-hooks';
import forEach from 'lodash/forEach';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { setBaseRoot } from '~app/navigation';
import { screens } from '~app/screens';

export { screens };

export function registerScreens() {
  // Register Screens
  forEach(screens, screen => {
    registerScreen(screen.name, withNavigationProvider(screen.component));
  });

  // Set root screen
  registerAppLaunchedListenerAndSetRoot();
}

function registerAppLaunchedListenerAndSetRoot() {
  const evs = Navigation.events();
  evs.registerAppLaunchedListener(() => {
    setBaseRoot();
  });
}

function registerScreen(name, component) {
  const WrappedComponent = wrapInProviders(component);
  Navigation.registerComponent(name, () =>
    gestureHandlerRootHOC(WrappedComponent),
  );
}

function wrapInProviders(Component) {
  const WrappedComponent = props => {
    return (
      <AppProviders>
        <Component safeArea {...props} />
      </AppProviders>
    );
  };
  return WrappedComponent;
}
