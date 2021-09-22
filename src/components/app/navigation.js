import { Navigation } from 'react-native-navigation';
import { SCREEN_NAMES, NAVIGATION_STACKS } from './appConstants';
import truncate from 'lodash/truncate';
import merge from 'lodash/merge';

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

export function setScreenTitle({ title, isVisible, mergeOptions }) {
  const truncatedTitle = truncate(title, {
    length: 25,
  });

  const newOptions = merge({
    topBar: {
      visible: isVisible,
      title: {
        text: truncatedTitle,
      },
    },
  });
  mergeOptions(newOptions);
}

export function goToCart({ options } = {}) {
  const combinedOptions = merge(options, {
    topBar: {
      title: {
        text: 'Cart',
      },
    },
  });

  pushScreen({
    componentName: SCREEN_NAMES.CART_SCREEN,
    options: combinedOptions,
  });
}

export function goToProfile({ options } = {}) {
  const combinedOptions = merge(options, {
    topBar: {
      title: {
        text: 'Profile',
      },
    },
  });

  pushScreen({
    componentName: SCREEN_NAMES.PROFILE_SCREEN,
    options: combinedOptions,
  });
}

export function goToInfo({ options } = {}) {
  const combinedOptions = merge(options, {
    topBar: {
      title: {
        text: 'Company Info',
      },
    },
  });

  pushScreen({
    componentName: SCREEN_NAMES.INFO_SCREEN,
    options: combinedOptions,
  });
}
