import { SCREEN_NAMES } from './appConstants';
import HomeScreen from '../screens/Home/HomeScreen';

export const screens = {
  homeScreen: {
    name: SCREEN_NAMES.HOME,
    component: HomeScreen,
  },
};

export const rootName = SCREEN_NAMES.HOME;
