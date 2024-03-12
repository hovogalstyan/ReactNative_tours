import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  SafeAreaView, StyleSheet, useWindowDimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useDispatch, useSelector } from 'react-redux';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import DrawerNavbarModal from '../../../components/home/DrawerNavbarModal';
import Popular from '../../../components/home/homeTabs/Popular';
import Destination from '../../../components/home/homeTabs/Destination';
import Tour from '../../../components/home/homeTabs/Tour';
import Services from '../../../components/home/homeTabs/Services';
import Navbar from '../../../components/home/Navbar';
import Header from '../../../components/home/Header';
import { activeCategoryPage } from '../../../store/actions/tours';

function Home() {
  const categoryPage = useSelector((state) => state.tours.categoryPage);
  const pagesRef = useRef(null);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const drawerValue = useSharedValue({
    left: -width - 60,
    scale: 0.6,
  });

  const animatedStylesDrawer = useAnimatedStyle(() => {
    return {
      left: withTiming(drawerValue.value.left, {
        duration: 450,
      }),
      transform: [{ scale: withTiming(drawerValue.value.scale, { duration: 150 }) }],
    };
  });

  useEffect(() => {
    if (pagesRef.current) {
      pagesRef.current.setPage(categoryPage);
    }
  }, [categoryPage]);

  const handleChange = useCallback((event) => {
    const { position } = event.nativeEvent;
    dispatch(activeCategoryPage(position));
  }, []);

  const openLeftDrawerModal = useCallback(() => {
    drawerValue.value = {
      left: 0,
      scale: 1,
    };
  }, []);

  return (
    <SafeAreaView style={styles.home}>
      <DrawerNavbarModal drawerValue={drawerValue} animatedStylesDrawer={animatedStylesDrawer} />
      <Header open={openLeftDrawerModal} />
      <Navbar />
      <PagerView
        ref={pagesRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handleChange}
      >
        <Popular key="Popular" />
        <Destination key="Destination" />
        <Tour key="Tour" />
        <Services key="Services" />
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  pagerView: {
    flex: 1,
  },
});

export default Home;
