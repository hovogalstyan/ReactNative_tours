import React, { useCallback, useRef } from 'react';
import {
  SafeAreaView, StyleSheet, View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/settings/Header';
import Navbar from '../../components/settings/Navbar';
import Profile from '../../components/settings/Profile';
import Password from '../../components/settings/Password';
import Document from '../../components/settings/Document';
import Notification from '../../components/settings/Notification';
import { activeSettingsPage } from '../../store/actions/users';

function Settings() {
  const pagerRef = useRef();
  const pagerScroll = useRef(null);
  const activePage = useSelector((state) => state.users.navbarPage);
  const dispatch = useDispatch();
  pagerRef.current?.setPage(activePage);

  const handlePageChange = useCallback((event) => {
    const index = event.nativeEvent.position;
    dispatch(activeSettingsPage(index));
    if (pagerScroll.current) {
      pagerScroll.current.scrollToIndex({ animated: true, index });
    }
  }, [pagerScroll]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Navbar pagerScroll={pagerScroll} />
      <PagerView
        initialPage={0}
        orientation="horizontal"
        ref={pagerRef}
        onPageSelected={handlePageChange}
        style={styles.container}
      >
        <View key={1}>
          <Profile />
        </View>
        <View key={2}>
          <Password />
        </View>
        <View key={3}>
          <Document />
        </View>
        <View key={4}>
          <Notification />
        </View>
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Settings;
