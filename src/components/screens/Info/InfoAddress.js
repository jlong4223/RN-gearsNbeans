import React from 'react';
import { VStack, Text, Heading, Pressable } from 'native-base';
import { getCompanyAddress, openMaps } from './helpers';

export default function InfoAddress(props) {
  const styles = getStyles();
  const location = getCompanyAddress();
  const openMap = () => openMaps(location);

  return (
    <VStack style={styles.container}>
      <Heading>Address</Heading>
      <Pressable onPress={openMap}>
        {location.map(({ address, city, state, zipCode }) => (
          <VStack key={zipCode} style={styles.addressContainer}>
            <Text>{address}</Text>
            <Text>
              {city}, {state}
            </Text>
            <Text>{zipCode}</Text>
          </VStack>
        ))}
      </Pressable>
    </VStack>
  );
}

function getStyles() {
  return {
    container: {
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addressContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
}
