import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-native-navigation-hooks';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { setScreenTitle } from '~app/navigation';
import { allRoutes, renderScreenScene } from '~screens/tabroutes/allTabRoutes';
import { HomeTabBar } from '~screens/Home/HomeTabBar';
import HomeHeader from '~screens/Home/HomeHeader';

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const { mergeOptions } = useNavigation();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    setRoutes(
      allRoutes.map(({ id, name, icon }) => ({
        key: id,
        title: name,
        icon: icon,
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
        renderTabBar={HomeTabBar}
        tabBarPosition="bottom"
      />
    </>
  );
}
