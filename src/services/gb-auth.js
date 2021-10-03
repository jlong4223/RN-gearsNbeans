import gbApi from '~services/gb-api';

export const login = userDetails => {
  return gbApi.post('/login', { ...userDetails });
};
