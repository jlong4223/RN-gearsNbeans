import React, { useEffect } from 'react';
import { Text, View } from 'native-base';
import { getGBBikeServices } from '~actions/allActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function BikeServicesRoute({ bikeServices, getGBBikeServices }) {
  useEffect(() => {
    getGBBikeServices();
  }, [getGBBikeServices]);

  return (
    <View>
      <Text>BikeServicesRoute</Text>
    </View>
  );
}

BikeServicesRoute.propTypes = {
  bikeServices: PropTypes.arrayOf(PropTypes.object),
  getGBBikeServices: PropTypes.func,
};

const mapStateToProps = state => ({
  bikeServices: state.bikeServices.services,
});

export default connect(mapStateToProps, { getGBBikeServices })(
  BikeServicesRoute,
);
