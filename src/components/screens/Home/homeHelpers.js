import React from 'react';
import { TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export const renderTabBar = tabViewProps => (
  <TabBar
    {...tabViewProps}
    indicatorStyle={{ backgroundColor: 'transparent' }}
    style={{ backgroundColor: '#5a411e' }}
    renderIcon={({ route, focused, color }) => (
      <Icon name={route.icon} size={25} color="white" />
    )}
  />
);
