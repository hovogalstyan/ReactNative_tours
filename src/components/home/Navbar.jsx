import React, { useCallback, useEffect, useState } from 'react';
import {
  View, StyleSheet, useWindowDimensions, Text, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { activeCategoryPage } from '../../store/actions/tours';

function Navbar() {
  const categorise = useSelector((state) => state.tours.categoryNavDate);
  const categoryPage = useSelector((state) => state.tours.categoryPage);
  const dispatch = useDispatch();
  const handleItemPress = useCallback((page) => () => {
    dispatch(activeCategoryPage(page));
  }, []);
  return (
    <View
      style={styles.navbar}
    >
      <View style={styles.navRow}>
        {
            categorise.map((item, index) => (
              <TouchableOpacity
                key={item}
                onPress={handleItemPress(index)}
              >
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 17,
                    color: categoryPage === index ? '#F79F1A' : '#000000',
                  }}
                >
                  {item}
                </Text>
                <View style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#F79F1A',
                  position: 'absolute',
                  bottom: -15,
                  transform: [{
                    scale: categoryPage === index ? 1 : 0,
                  }],
                }}
                />
              </TouchableOpacity>
            ))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    paddingHorizontal: 16,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.8,
    borderBottomColor: 'rgba(0,0,0,0.38)',
    overflow: 'hidden',
  },
});
export default Navbar;
