import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromCart, clearEntireCart } from '~actions/cartActions';
import {
  ScrollView,
  Text,
  View,
  HStack,
  VStack,
  Pressable,
  Button,
} from 'native-base';
import CartMessage from '~screens/Cart/CartMessage';
import CheckoutBtn from '~screens/Cart/CheckoutBtn';

function CartScreen({ cartItems, removeFromCart, clearEntireCart }) {
  const { total, cart, itemCount } = cartItems;
  const styles = getStyles();
  console.log('cart: ', cart);

  // TODO move to own component
  const renderCartItems = () => {
    return cart.map(item => (
      <HStack key={item._id} style={styles.container}>
        <Pressable onPress={() => console.log('pressed item')}>
          <HStack style={styles.cartCard}>
            <VStack>
              <Text fontSize="lg">{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </VStack>
            <VStack>
              <Text>${item.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Button onPress={() => removeFromCart(item)}>Remove</Button>
            </VStack>
          </HStack>
        </Pressable>
      </HStack>
    ));
  };

  return (
    <>
      <CartMessage total={total} itemCount={itemCount} />
      <ScrollView>{renderCartItems()}</ScrollView>
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
      height: 90,
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
};

const mapStateToProps = state => {
  return {
    cartItems: state.cart,
  };
};

export default connect(mapStateToProps, { removeFromCart, clearEntireCart })(
  CartScreen,
);
