import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'native-base';
import CartMessage from '~screens/Cart/CartMessage';
function CartScreen({ cartItems }) {
  const { total, cart, itemCount } = cartItems;

  return (
    <View>
      <CartMessage total={total} itemCount={itemCount} />
    </View>
  );
}

CartScreen.propTypes = {
  cartItems: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    cartItems: state.cart,
  };
};

export default connect(mapStateToProps)(CartScreen);
