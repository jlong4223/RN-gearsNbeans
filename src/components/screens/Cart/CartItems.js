import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '~actions/cartActions';
import { Text, HStack, VStack, Button, ScrollView } from 'native-base';
function CartItems({
  cart,
  removeFromCart,
  btnColorScheme,
  addQuantityToCartItem,
  removeQuantityFromCartItem,
}) {
  const styles = getStyles();

  const removeItem = item =>
    removeItemFromCart({ item, removeFromCart, removeQuantityFromCartItem });

  const cartBtns = getCartBtns({
    btnColorScheme,
    addQuantityToCartItem,
    removeItem,
  });

  return (
    <ScrollView>
      {cart.map(item => (
        <HStack key={item._id} style={styles.container}>
          <HStack style={styles.cartCard}>
            <VStack>
              <Text fontSize="lg">{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </VStack>
            <VStack>
              <VStack style={styles.itemDetails}>
                <Text>${item.price}</Text>
                <Text>Count: {item.quantity}</Text>
              </VStack>
              <HStack>
                {cartBtns.map(btn => (
                  <Button
                    key={btn.id}
                    style={styles.qtyBtns}
                    onPress={() => btn.onPress(item)}
                    colorScheme={btnColorScheme}>
                    {btn.btnSign}
                  </Button>
                ))}
              </HStack>
            </VStack>
          </HStack>
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
      padding: 5,
      justifyContent: 'space-between',
      width: '90%',
    },
    description: {
      width: 250,
      marginLeft: 10,
    },
    qtyBtns: {
      margin: 2,
    },
    itemDetails: {
      alignItems: 'flex-end',
    },
  };
}

function removeItemFromCart({
  item,
  removeFromCart,
  removeQuantityFromCartItem,
}) {
  item.quantity > 1 ? removeQuantityFromCartItem(item) : removeFromCart(item);
}

function getCartBtns({ btnColorScheme, removeItem, addQuantityToCartItem }) {
  return [
    {
      id: 'removeBtn',
      btnSign: '-',
      colorScheme: btnColorScheme,
      onPress: removeItem,
    },
    {
      id: 'addBtn',
      btnSign: '+',
      colorScheme: btnColorScheme,
      onPress: addQuantityToCartItem,
    },
  ];
}
CartItems.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addQuantityToCartItem: PropTypes.func.isRequired,
  removeQuantityFromCartItem: PropTypes.func.isRequired,
  btnColorScheme: PropTypes.string.isRequired,
};

export default connect(null, actions)(CartItems);
