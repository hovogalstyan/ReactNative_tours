import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

function ScrollLoading() {
  return (
    <View style={styles.footerLoading}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  footerLoading: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ScrollLoading;
