import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Popover, Button } from 'native-base';

export default function InfoPopover({ btnColorScheme, styles, product }) {
  return (
    <Popover
      placement="top"
      trigger={triggerProps => {
        return (
          <Button colorScheme={btnColorScheme} {...triggerProps}>
            <Icon name="info-circle" size={30} style={styles.btnIcon} />
          </Button>
        );
      }}>
      <Popover.Content accessibilityLabel="service-info" w="56">
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Header>{product.name}</Popover.Header>
        <Popover.Body>{product.description}</Popover.Body>
      </Popover.Content>
    </Popover>
  );
}

InfoPopover.propTypes = {
  btnColorScheme: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  product: PropTypes.object,
};
