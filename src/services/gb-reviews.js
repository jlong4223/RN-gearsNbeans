import gbApi from '~services/gb-api';

export const getReviews = async () => {
  const reviews = await gbApi.get('/reviews');
  return reviews;
};

export const getProducts = async () => {
  const products = await gbApi.get('/products');
  return products;
};
