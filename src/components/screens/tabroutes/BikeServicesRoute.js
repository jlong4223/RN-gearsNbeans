import React, { useEffect } from 'react';
import * as cartActions from '~actions/allActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductCard from '~sharedComponents/ProductCard';
function BikeServicesRoute({ bikeServices, getGBBikeServices, addToCart }) {
  useEffect(() => {
    getGBBikeServices();
  }, [getGBBikeServices]);

  return <ProductCard products={bikeServices} addToCart={addToCart} />;
}

BikeServicesRoute.propTypes = {
  bikeServices: PropTypes.arrayOf(PropTypes.object),
  getGBBikeServices: PropTypes.func,
  addToCart: PropTypes.func,
};

const mapStateToProps = state => ({
  bikeServices: state.bikeServices.services,
});

export default connect(mapStateToProps, cartActions)(BikeServicesRoute);
