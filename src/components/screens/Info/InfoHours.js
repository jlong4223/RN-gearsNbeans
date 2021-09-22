import React from 'react';
import { VStack, Text, Heading } from 'native-base';

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

function getHours() {
  return [
    {
      day: 'Monday',
      hours: '8:00am - 1:00pm',
    },
    {
      day: 'Tuesday',
      hours: '8:00am - 1:00pm',
    },
    {
      day: 'Wednesday',
      hours: '8:00am - 1:00pm',
    },
    {
      day: 'Thursday',
      hours: '8:00am - 1:00pm',
    },
    {
      day: 'Friday',
      hours: '8:00am - 1:00pm',
    },
    {
      day: 'Saturday',
      hours: '8:00am - 1:00pm',
    },
    {
      day: 'Sunday',
      hours: 'CLOSED',
    },
  ];
}
