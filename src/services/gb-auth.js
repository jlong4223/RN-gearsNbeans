import gbApi from '~services/gb-api';

export const login = userDetails => {
  return gbApi.post('/login', { ...userDetails });
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
