import gbApi from '~services/gb-api';

export const getReviews = async () => {
  const reviews = await gbApi.get('/reviews');
  return reviews;
};
