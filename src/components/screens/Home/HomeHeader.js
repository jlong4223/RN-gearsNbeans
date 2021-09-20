import React from 'react';
import { HStack, Menu, useTheme, Pressable, Text } from 'native-base';
import { scale, moderateScale } from 'react-native-size-matters';

// TODO update header to use icon

export default function InboxHeader() {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <HStack style={styles.header}>
      <Menu
        placement="left"
        // TODO check this on android
        crossOffset={58}
        offset={-55}
        trigger={triggerProps => {
          return (
            <Pressable
              accessibilityLabel="Profile Options Menu"
              {...triggerProps}>
              <Text> Profile </Text>
            </Pressable>
          );
        }}>
        <Menu.Item>View Cart</Menu.Item>
        <Menu.Item>Login</Menu.Item>
        <Menu.Item>Signup</Menu.Item>
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
      backgroundColor: theme.colors.background,
    },
  };
}
