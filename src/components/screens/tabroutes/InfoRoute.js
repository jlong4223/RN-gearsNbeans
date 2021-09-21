import React from 'react';
import MapView from 'react-native-maps';
import { VStack, Text } from 'native-base';
import { ScrollView } from 'react-native';
import GBLogo from '../../shared/GBLogo';

export default function InfoRoute() {
  const styles = getStyles();

  return (
    <ScrollView>
      <VStack style={styles.container}>
        <GBLogo imgSize={'2xl'} />
        <Text style={styles.text}>
          The one stop shop for all your hipster needs. Pedal up, get your pour,
          and have one of our trusted mechanics look over your bike.
        </Text>
        <MapView
          // TODO add a conditional to check for android or configure to use gMaps
          style={styles.map}
          //   TODO set to austin
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </VStack>
    </ScrollView>
  );
}

function getStyles() {
  return {
    container: {
      alignItems: 'center',
    },
    map: {
      height: 300,
      width: 400,
    },
    text: {
      marginTop: 50,
      marginBottom: 50,
      width: '70%',
      textAlign: 'center',
    },
  };
}
