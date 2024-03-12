import React from 'react';
import {
  ActivityIndicator,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

function OrderButton({ isLoading, ...props }) {
  return (
    <View style={styles.bookVi}>
      <TouchableOpacity
        {...props}
        style={styles.bookBtn}
      >
        {
          isLoading ? <ActivityIndicator color="blue" />
            : <Text style={styles.bookBtnText}>Book Now</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bookVi: {
    paddingHorizontal: 13,
    marginBottom: 15,
  },
  bookBtn: {
    backgroundColor: '#FF9500',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 10,
  },
  bookBtnText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});
export default OrderButton;
