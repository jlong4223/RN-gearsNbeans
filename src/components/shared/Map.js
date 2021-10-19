import React from 'react';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

export default function Map({ coordinates }) {
  const styles = getStyles();

  return (
    <MapView
      // TODO add a conditional to check for android or configure to use gMaps
      style={styles.map}
      initialRegion={coordinates}
    />
  );
}

function getStyles() {
  return {
    map: {
      height: 300,
      width: '100%',
    },
  };
}

Map.propTypes = {
  coordinates: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  }).isRequired,
};
