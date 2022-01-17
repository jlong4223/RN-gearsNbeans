import gbApi from '~services/gb-api';

export const login = async userDetails => {
  return await gbApi
    .post('/login', { ...userDetails })
    .then(res => res)
    .catch(err => err);
};

export const register = userInput => {
  const { email, password, firstName, lastName } = userInput;

  const userDetails = {
    name: `${firstName} ${lastName}`,
    email,
    password,
  };

  return gbApi.post('/signup', { ...userDetails });
};
