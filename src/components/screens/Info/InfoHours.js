import React from 'react';
import { VStack, Text, Heading } from 'native-base';
import { getHours } from '~screens/Info/helpers';

export default function InfoHours() {
  const styles = getStyles();
  const companyHours = getHours();

  return (
    <VStack style={styles.container}>
      <Heading>Hours</Heading>
      {companyHours.map(({ day, hours }) => (
        <Text key={day}>
          {day}: {hours}
        </Text>
      ))}
    </VStack>
  );
}

function getStyles() {
  return {
    container: {
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
}
