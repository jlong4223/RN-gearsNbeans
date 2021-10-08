import { Linking } from 'react-native';
import { isiOS } from '~app/platformHelpers';

export function getCompanyAddress() {
  return [
    {
      address: '6004 Glen Meadow Drive',
      city: 'Austin',
      state: 'TX',
      zipCode: 78745,
    },
  ];
}

export async function openMaps(location) {
  const { address, city, zipCode } = location[0];
  const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`);
  const provider = isiOS() ? 'apple' : 'google';
  const link = `http://maps.${provider}.com/?daddr=${destination}`;

  try {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      Linking.openURL(link);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('InfoAddress maps error: ', error);
  }
}
