import React from 'react';
import { ScrollView } from 'react-native';
import InfoHours from '~screens/Info/InfoHours';
import InfoAddress from '~screens/Info/InfoAddress';

export default function InfoScreen() {
  return (
    <ScrollView>
      <InfoHours />
      <InfoAddress />
      {/* TODO add social icons */}
    </ScrollView>
  );
}
