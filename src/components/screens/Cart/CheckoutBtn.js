import React from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text } from 'native-base';
import { useDispatch } from 'react-redux';
import { checkoutCart } from '../../../redux/actions/cartActions';

export default function CheckoutBtn({ total, btnColorScheme }) {
  const styles = getStyles();
  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(checkoutCart());
  };

  return (
    <View style={styles.btnContainer}>
      <Button style={styles.checkoutBtn} colorScheme={btnColorScheme}>
        <Text onPress={handleCheckout}>Checkout ${total}</Text>
      </Button>
    </View>
  );
}

function getStyles() {
  return {
    btnContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    checkoutBtn: {
      height: 50,
      width: '90%',
      marginBottom: 30,
      borderRadius: 20,
    },
  };
}

CheckoutBtn.propTypes = {
  total: PropTypes.number,
  btnColorScheme: PropTypes.string,
};
