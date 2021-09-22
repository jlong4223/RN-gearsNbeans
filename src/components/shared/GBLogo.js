import React from 'react';
import PropTypes from 'prop-types';
import { Image, useColorModeValue } from 'native-base';
import DarkLogo from '../../assets/dark-mode-gears.png';
import LightLogo from '../../assets/light-mode-gears.png';

export default function GBLogo({ imgSize }) {
  return (
    <Image
      alt="GearsNBeans-Logo"
      source={useColorModeValue(LightLogo, DarkLogo)}
      size={imgSize || 'lg'}
    />
  );
}

GBLogo.propTypes = {
  imgSize: PropTypes.string,
};
