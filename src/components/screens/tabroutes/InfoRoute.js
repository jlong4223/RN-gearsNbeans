import React from 'react';
import { VStack, Text } from 'native-base';
import { ScrollView } from 'react-native';
import GBLogo from '~sharedComponents/GBLogo';
import Map from '~sharedComponents/Map';

export default function InfoRoute() {
  const styles = getStyles();

  const businessCoordinates = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  return (
    <ScrollView>
      <VStack style={styles.container}>
        <GBLogo imgSize={'2xl'} />
        <Text style={styles.text}>
          The one stop shop for all your hipster needs. Pedal up, get your pour,
          and have one of our trusted mechanics look over your bike.
        </Text>
        <Map coordinates={businessCoordinates} />
        <Text style={styles.text}>
          We directly source and roast elite coffees from around the world. We
          are dedicated to bringing you closer to the journey and excitement of
          coffee by experiencing it and drinking it together.
        </Text>
      </VStack>
    </ScrollView>
  );
}

function getStyles() {
  return {
    container: {
      alignItems: 'center',
    },
    text: {
      marginTop: 50,
      marginBottom: 50,
      width: '70%',
      textAlign: 'center',
    },
  };
}
