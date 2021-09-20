import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-native-navigation-hooks';
import { View, Text, HStack, Menu, useTheme, Pressable } from 'native-base';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { setScreenTitle } from '../../app/navigation';
import { allRoutes } from '../tabroutes/allTabRoutes';
import HomeHeader from './HomeHeader';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ffeb3b' }} />
);

const fourthRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#2196f3' }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: fourthRoute,
});

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const { mergeOptions, showModal } = useNavigation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Home' },
    { key: 'second', title: 'Bike' },
    { key: 'third', title: 'Coffee' },
    { key: 'fourth', title: 'Reviews' },
  ]);

  useEffect(() => {
    setScreenTitle({
      title: 'Home',
      isVisible: false,
      mergeOptions,
    });
  }, []);

  return (
    <>
      <HomeHeader />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
}
