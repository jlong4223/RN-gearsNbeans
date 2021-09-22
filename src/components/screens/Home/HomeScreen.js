import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-native-navigation-hooks';
import { useWindowDimensions } from 'react-native';
import { connect } from 'react-redux';
import { TabView } from 'react-native-tab-view';
import { setScreenTitle } from '../../app/navigation';
import { allRoutes, renderScreenScene } from '../tabroutes/allTabRoutes';
import { HomeTabBar } from './HomeTabBar';
import HomeHeader from './HomeHeader';

function HomeScreen({ replaceMe }) {
  console.log('redux state: ', replaceMe);
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
        renderTabBar={HomeTabBar}
        tabBarPosition="bottom"
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    replaceMe: state.replaceMe,
  };
};

export default connect(mapStateToProps, null)(HomeScreen);
