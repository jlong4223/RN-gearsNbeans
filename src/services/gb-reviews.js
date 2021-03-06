import gbApi from '~services/gb-api';
import { getAuthTokenHeader } from '~services/auth-token';

export const getReviews = async () => {
  const reviews = await gbApi.get('/reviews');
  return reviews.data.reverse();
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

export const deleteReview = async review => {
  return gbApi.delete(`/reviews/${review._id}`, {
    data: review,
    headers: await getAuthTokenHeader(),
  });
};

export const updateReview = async reviewObj => {
  return gbApi.patch(`/reviews/${reviewObj._id}`, reviewObj, {
    headers: await getAuthTokenHeader(),
  });
};
