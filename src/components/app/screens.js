import { SCREEN_NAMES } from '~app/appConstants';
import HomeScreen from '~screens/Home/HomeScreen';
import CartScreen from '~screens/Cart/CartScreen';
import ProfileScreen from '~screens/Profile/ProfileScreen';
import InfoScreen from '~screens/Info/InfoScreen';
import SignInScreen from '~screens/Profile/SignInScreen';

export const screens = {
  homeScreen: {
    name: SCREEN_NAMES.HOME,
    component: HomeScreen,
  },
  cartScreen: {
    name: SCREEN_NAMES.CART_SCREEN,
    component: CartScreen,
  },
  profileScreen: {
    name: SCREEN_NAMES.PROFILE_SCREEN,
    component: ProfileScreen,
  },
  infoScreen: {
    name: SCREEN_NAMES.INFO_SCREEN,
    component: InfoScreen,
  },
  signInScreen: {
    name: SCREEN_NAMES.SIGN_IN_SCREEN,
    component: SignInScreen,
  },
};

export const rootName = SCREEN_NAMES.HOME;
