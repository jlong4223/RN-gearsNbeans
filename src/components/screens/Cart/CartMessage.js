import React from 'react';
import PropTypes from 'prop-types';
import { Text, VStack } from 'native-base';

export default function CartMessage({ itemCount }) {
  const styles = getStyles();

  return !itemCount ? (
    <Text style={styles.noItemContainer}>No items in cart.</Text>
  ) : (
    <VStack style={styles.container}>
      <Text>You have {itemCount} item(s) in your cart</Text>
    </VStack>
  );
}

function getStyles() {
  return {
    container: {
      alignItems: 'center',
      marginTop: 10,
    },
    noItemContainer: {
      textAlign: 'center',
      marginTop: 10,
    },
  };
}

CartMessage.propTypes = {
  itemCount: PropTypes.number,
};
