import { SceneMap } from 'react-native-tab-view';
import BikeServicesRoute from './BikeServicesRoute';
import CoffeeProductsRoute from './CoffeeProductsRoute';
import ReviewsRoute from './ReviewsRoute';
import InfoRoute from './InfoRoute';

export const allRoutes = [
  {
    name: 'Home',
    component: InfoRoute,
    icon: 'home',
    id: 'info',
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
  info: InfoRoute,
  services: BikeServicesRoute,
  coffeeProducts: CoffeeProductsRoute,
  reviews: ReviewsRoute,
});
