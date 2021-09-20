import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-native-navigation-hooks';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { setScreenTitle } from '../../app/navigation';
import { allRoutes, renderScreenScene } from '../tabroutes/allTabRoutes';
import { renderTabBar } from './homeHelpers';
import HomeHeader from './HomeHeader';

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const { mergeOptions } = useNavigation();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    setRoutes(
      allRoutes.map(route => ({
        key: route.id,
        title: route.name,
        icon: route.icon,
      })),
    );
  }, []);

  useEffect(() => {
    setScreenTitle({
      title: 'Home',
      isVisible: false,
      mergeOptions,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HomeHeader />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScreenScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
}
