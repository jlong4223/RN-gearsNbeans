import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '~actions/cartActions';
import { Text, View, Button } from 'native-base';
import CartMessage from '~screens/Cart/CartMessage';
import CheckoutBtn from '~screens/Cart/CheckoutBtn';
import CartItems from '~screens/Cart/CartItems';
function CartScreen({ cartItems, clearEntireCart }) {
  const { total, cart, itemCount } = cartItems;
  const styles = getStyles();
  // console.log('cart: ', cart);

  return (
    <>
      <CartMessage total={total} itemCount={itemCount} />
      <CartItems cart={cart} />
      {itemCount > 0 && (
        <>
          <View style={styles.btnContainer}>
            <Button onPress={clearEntireCart} style={styles.clearBtn}>
              <Text>Clear Entire Cart</Text>
            </Button>
          </View>
          <CheckoutBtn total={total} />
        </>
      )}
    </>
  );
}

function getStyles() {
  return {
    container: {
      justifyContent: 'space-around',
    },
    cartCard: {
      marginTop: 15,
      marginLeft: 5,
      // height: 90,
      padding: 5,
      justifyContent: 'space-between',
      width: '90%',
    },
    description: {
      width: 250,
      marginLeft: 10,
    },
    btnContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    clearBtn: {
      height: 50,
      width: '90%',
      marginBottom: 10,
      borderRadius: 20,
    },
  };
}

CartScreen.propTypes = {
  cartItems: PropTypes.object,
  removeFromCart: PropTypes.func,
  clearEntireCart: PropTypes.func,
  addQuantityToCartItem: PropTypes.func,
  removeQuantityFromCartItem: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    cartItems: state.cart,
  };
};

export default connect(mapStateToProps, actions)(CartScreen);
