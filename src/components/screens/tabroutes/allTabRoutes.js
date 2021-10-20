import { SceneMap } from 'react-native-tab-view';
import BikeServicesRoute from './BikeServicesRoute';
import CoffeeProductsRoute from './CoffeeProductsRoute';
import ReviewsRoute from '~screens/tabroutes/Reviews/ReviewsRoute';
import LandingRoute from '~screens/tabroutes/LandingRoute';

export const allRoutes = [
  {
    name: 'Home',
    component: LandingRoute,
    icon: 'home',
    id: 'landing',
  },
  {
    name: 'Bike',
    component: BikeServicesRoute,
    icon: 'bicycle',
    id: 'services',
  },
  {
    name: 'Coffee',
    component: CoffeeProductsRoute,
    icon: 'coffee',
    id: 'coffeeProducts',
  },
  {
    name: 'Reviews',
    component: ReviewsRoute,
    icon: 'star-half-full',
    id: 'reviews',
  },
];

export const renderScreenScene = SceneMap({
  landing: LandingRoute,
  services: BikeServicesRoute,
  coffeeProducts: CoffeeProductsRoute,
  reviews: ReviewsRoute,
});
