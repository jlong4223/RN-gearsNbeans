import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '~actions/cartActions';
import {
  Text,
  HStack,
  VStack,
  Pressable,
  Button,
  ScrollView,
} from 'native-base';

function CartItems({
  cart,
  removeFromCart,
  addQuantityToCartItem,
  removeQuantityFromCartItem,
}) {
  const styles = getStyles();

  function removeItemFromCart(item) {
    item.quantity > 1 ? removeQuantityFromCartItem(item) : removeFromCart(item);
  }

  return (
    <ScrollView>
      {cart.map(item => (
        <HStack key={item._id} style={styles.container}>
          {/* TODO remove later */}
          {/* eslint-disable-next-line no-console */}
          <Pressable onPress={() => console.log('pressed item')}>
            <HStack style={styles.cartCard}>
              <VStack>
                <Text fontSize="lg">{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </VStack>
              <VStack>
                <Text>${item.price}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Button onPress={() => addQuantityToCartItem(item)}>+</Button>
                <Button onPress={() => removeItemFromCart(item)}>-</Button>
              </VStack>
            </HStack>
          </Pressable>
        </HStack>
      ))}
    </ScrollView>
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
  };
}

CartItems.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addQuantityToCartItem: PropTypes.func.isRequired,
  removeQuantityFromCartItem: PropTypes.func.isRequired,
};

export default connect(null, actions)(CartItems);
