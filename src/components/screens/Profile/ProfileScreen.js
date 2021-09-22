import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'native-base';

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen </Text>
    </View>
  );
}

export default connect()(ProfileScreen);
