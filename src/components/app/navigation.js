import { Navigation } from 'react-native-navigation';
import { SCREEN_NAMES, NAVIGATION_STACKS } from './appConstants';

export function setBaseRoot() {
  Navigation.setRoot({
    root: {
      stack: {
        id: NAVIGATION_STACKS.MAIN,
        children: [
          {
            component: {
              name: SCREEN_NAMES.HOME,
              options: {
                topBar: {
                  title: {
                    text: 'Home',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
}

export function setRootHome() {
  setRoot({
    screenName: SCREEN_NAMES.HOME,
  });
}

function setRoot({ screenName, passProps = {}, options }) {
  Navigation.setStackRoot(NAVIGATION_STACKS.NAVIGATION_STACK, {
    component: {
      name: screenName,
      passProps,
      options,
    },
  });
}

function pushScreen({ componentName, options = {}, passProps = {} }) {
  Navigation.push(NAVIGATION_STACKS.NAVIGATION_STACK, {
    component: {
      name: componentName,
      options,
      passProps,
    },
  });
}
