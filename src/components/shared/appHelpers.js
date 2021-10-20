import format from 'date-fns/format';

export const getFormattedDate = date => format(new Date(date), 'MMMM dd, yyyy');

export function getBusinessCoordinates() {
  return {
    latitude: 30.266926,
    longitude: -97.750519,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
}
