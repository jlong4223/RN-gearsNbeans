import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'native-base';

function CartScreen() {
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  );
}

export default connect()(CartScreen);
