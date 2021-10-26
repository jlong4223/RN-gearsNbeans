import gbApi from '~services/gb-api';

export const getReviews = async () => {
  const reviews = await gbApi.get('/reviews');
  return reviews;
};

export const getProducts = async () => {
  const products = await gbApi.get('/products');
  return products;
};

export const getBikeServices = async () => {
  const services = await gbApi.get('/services');
  return services;
};

export const postReview = review => {
  return gbApi.post('/reviews', review);
};

export const deleteReview = reviewId => {
  return gbApi.delete(`/reviews/${reviewId}`);
};
