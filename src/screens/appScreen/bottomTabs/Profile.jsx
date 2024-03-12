import React from 'react';
import {
  SafeAreaView, StyleSheet,
} from 'react-native';

function Profile() {
  return (
    <SafeAreaView style={styles.container} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default Profile;
