import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View } from 'native-base';
import { getCartItems } from '~redux/actions/cartActions';

function CartScreen({ cartItems }) {
  const { total, cart, itemCount } = cartItems;

  return (
    <View>
      <Text>You have {itemCount} items in your cart</Text>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(getCartItems, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
