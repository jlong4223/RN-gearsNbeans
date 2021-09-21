import React from 'react';
import { Image, useColorModeValue } from 'native-base';
import DarkLogo from '../../assets/dark-mode-gears.png';
import LightLogo from '../../assets/light-mode-gears.png';

export default function TBLogo({ imgSize }) {
  const styles = getStyles();

  return (
    <Image
      alt="Threadbolt-Logo"
      source={useColorModeValue(LightLogo, DarkLogo)}
      size={imgSize || 'lg'}
    />
  );
}

function getStyles() {
  return {};
}
