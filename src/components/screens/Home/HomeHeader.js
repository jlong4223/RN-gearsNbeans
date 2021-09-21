import React from 'react';
import { HStack, Menu, useTheme, Pressable } from 'native-base';
import { scale, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function InboxHeader() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const menuItems = getMenuItems();

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
          <Menu.Item key={item.key} style={styles.menuItem}>
            {item.name}
            <Icon name={item.icon} size={25} style={styles.menuIcon} />
          </Menu.Item>
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

function getMenuItems() {
  return [
    {
      name: 'Profile',
      icon: 'user-circle',
      key: 'profile',
    },
    {
      name: 'Cart',
      icon: 'cart-plus',
      key: 'cart',
    },
    {
      name: 'Info',
      icon: 'info',
      key: 'info',
    },
  ];
}
