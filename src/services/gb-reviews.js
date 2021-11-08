import gbApi from '~services/gb-api';
import { getAuthTokenHeader } from '~services/auth-token';

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

export const postReview = async review => {
  return gbApi.post('/reviews', review, {
    headers: await getAuthTokenHeader(),
  });
};

export const deleteReview = async reviewId => {
  return gbApi.delete(`/reviews/${reviewId}`, {
    headers: await getAuthTokenHeader(),
  });
};

export const updateReview = async reviewObj => {
  return gbApi.patch(`/reviews/${reviewObj._id}`, reviewObj, {
    headers: await getAuthTokenHeader(),
  });
};
