import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator
        size="large"
        color="blue"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Loading;
