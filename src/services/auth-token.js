import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export const setToken = token => {
  return AsyncStorage.setItem('auth-token', token);
};

export const getToken = async () => {
  const userToken = await AsyncStorage.getItem('auth-token');
  return userToken;
};

export const removeAuthToken = async () => {
  return AsyncStorage.removeItem('auth-token');
};

export const getEntireUserFromToken = async () => {
  const token = await getToken();
  if (token) {
    const decoded = jwt_decode(token);
    return decoded;
  }
};

export async function getAuthTokenHeader() {
  return { Authorization: `Bearer ${await getToken()}` };
}
