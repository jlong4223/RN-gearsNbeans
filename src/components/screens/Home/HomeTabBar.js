import React from 'react';
import { TabBar } from 'react-native-tab-view';
import { useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export const HomeTabBar = tabViewProps => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <TabBar
      {...tabViewProps}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBar}
      renderIcon={({ route, focused, color }) => (
        <Icon name={route.icon} size={25} style={styles.tabBarIcon} />
      )}
    />
  );
};

function getStyles(theme) {
  return {
    tabBarIcon: {
      color: theme.colors.textColor,
    },
    indicatorStyle: {
      backgroundColor: 'transparent',
    },
    tabBar: {
      backgroundColor: theme.colors.surface,
    },
  };
}
