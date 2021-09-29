import React from 'react';
import { connect } from 'react-redux';
import { HStack, Menu, useTheme, Pressable, Text } from 'native-base';
import { scale, moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';

import { goToCart, goToProfile, goToInfo } from '~app/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

function HomeHeader({ cartItemCount }) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const menuItems = getMenuItems({ cartItemCount });

  return (
    <HStack style={styles.header}>
      <Menu
        placement="bottom"
        // TODO check this on android
        offset={-40}
        trigger={triggerProps => {
          return (
            <Pressable
              accessibilityLabel="Profile Options Menu"
              {...triggerProps}>
              <Icon name="gears" size={30} style={styles.menuIcon} />
            </Pressable>
          );
        }}>
        {menuItems.map(item => (
          <Pressable key={item.key}>
            <Menu.Item
              style={styles.menuItem}
              onPress={() => {
                item.navigate({});
              }}>
              <Text>
                {item.name}
                {item.showCartItemCount && <Text>({cartItemCount})</Text>}
              </Text>
              <Icon name={item.icon} size={25} style={styles.menuIcon} />
            </Menu.Item>
          </Pressable>
        ))}
      </Menu>
    </HStack>
  );
}

function getStyles(theme) {
  const commonHeaderStyles = {
    width: '100%',
    alignItems: 'center',
    padding: scale(5),
    height: moderateScale(40),
  };
  return {
    header: {
      ...commonHeaderStyles,
      justifyContent: 'flex-end',
      paddingLeft: scale(5),
      borderBottomWidth: 0.2,
    },
    menuItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    menuIcon: {
      color: theme.colors.altBackground,
    },
  };
}

function getMenuItems({ cartItemCount }) {
  const showCartItemCount = cartItemCount > 0;

  return [
    {
      name: 'Profile',
      icon: 'user-circle',
      key: 'profile',
      navigate: goToProfile,
    },
    {
      name: 'Cart',
      icon: 'cart-plus',
      key: 'cart',
      navigate: goToCart,
      showCartItemCount,
    },
    {
      name: 'Info',
      icon: 'info',
      key: 'info',
      navigate: goToInfo,
    },
  ];
}

HomeHeader.propTypes = {
  cartItemCount: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    cartItemCount: state.cart.itemCount,
  };
};

export default connect(mapStateToProps)(HomeHeader);
