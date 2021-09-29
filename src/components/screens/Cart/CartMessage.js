import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';

export default function CartMessage({ itemCount, total }) {
  return !itemCount ? (
    <Text>No items in cart.</Text>
  ) : (
    <>
      <Text>You have {itemCount} item(s) in your cart</Text>
      <Text>Total: ${total}</Text>
    </>
  );
}

CartMessage.propTypes = {
  itemCount: PropTypes.number,
  total: PropTypes.number,
};
