import React from 'react';
import { StyleSheet, View } from 'react-native';

function Services() {
  return (
    <View style={styles.services} />
  );
}
const styles = StyleSheet.create({
  services: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});
export default Services;
