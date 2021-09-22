import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import InfoHours from './InfoHours';
import InfoAddress from './InfoAddress';

function InfoScreen() {
  return (
    <ScrollView>
      <InfoHours />
      <InfoAddress />
      {/* TODO add social icons */}
    </ScrollView>
  );
}

export default connect()(InfoScreen);
