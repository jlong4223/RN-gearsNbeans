import { Platform } from 'react-native';

export function isiOS() {
  return Platform.OS === 'ios';
}

export function isiPad() {
  return Platform.isPad && isiOS();
}

export function isAndroid() {
  return Platform.OS === 'android';
}
