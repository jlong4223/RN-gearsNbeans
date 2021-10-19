import React, { useEffect } from 'react';
import * as cartActions from '~actions/allActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductCard from '~sharedComponents/ProductCard';

function CoffeeProductsRoute({ coffeeProducts, getGBProducts, addToCart }) {
  useEffect(() => {
    getGBProducts();
  }, [getGBProducts]);

  return <ProductCard products={coffeeProducts} addToCart={addToCart} />;
}

CoffeeProductsRoute.propTypes = {
  coffeeProducts: PropTypes.arrayOf(PropTypes.object),
  getGBProducts: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  coffeeProducts: state.products.products,
});

export default connect(mapStateToProps, cartActions)(CoffeeProductsRoute);
