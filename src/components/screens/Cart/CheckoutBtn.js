import React from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text } from 'native-base';

export default function CheckoutBtn({ total, btnColorScheme }) {
  const styles = getStyles();

  return (
    <View style={styles.btnContainer}>
      <Button style={styles.checkoutBtn} colorScheme={btnColorScheme}>
        <Text>Checkout ${total}</Text>
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
