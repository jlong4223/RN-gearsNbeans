import { Navigation } from 'react-native-navigation';
import { SCREEN_NAMES, NAVIGATION_STACKS } from '~app/appConstants';
import truncate from 'lodash/truncate';
import merge from 'lodash/merge';
import { clearError } from '~redux/actions/errorAction';

Navigation.events().registerNavigationButtonPressedListener(
  ({ componentId, buttonId }) => {
    // TODO see if i can call a redux action here
    clearError();
    Navigation.pop(componentId);
  },
);

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
                  backButton: {
                    color: '#000',
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

// TODO test this and see if topBar options are necessary
export function setProfileRoot() {
  Navigation.setRoot({
    root: {
      stack: {
        id: NAVIGATION_STACKS.MAIN,
        children: [
          {
            component: {
              name: SCREEN_NAMES.PROFILE_SCREEN,
              options: {
                topBar: {},
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
      backButton: {
        color: '#000',
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

export function goToSignIn({ options } = {}) {
  console.log('goToSignIn options', options);

  const combinedOptions = merge(options, {
    topBar: {
      title: {
        text: 'Sign In',
      },
      backButton: {
        color: '#000',
        popStackOnPress: false,
      },
    },
  });

  pushScreen({
    componentName: SCREEN_NAMES.SIGN_IN_SCREEN,
    options: combinedOptions,
  });
}

export function goToRegister({ options } = {}) {
  const combinedOptions = merge(options, {
    topBar: {
      title: {
        text: 'Register',
      },
    },
  });

  pushScreen({
    componentName: SCREEN_NAMES.REGISTER_SCREEN,
    options: combinedOptions,
  });
}
