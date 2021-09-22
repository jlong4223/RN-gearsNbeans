import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'native-base';

function InfoScreen() {
  return (
    <View>
      <Text>InfoScreen</Text>
    </View>
  );
}

export default connect()(InfoScreen);
