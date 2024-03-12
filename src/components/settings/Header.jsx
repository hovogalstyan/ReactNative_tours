import React, { useCallback } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LeftIcon, TabNavbarFrameIcon } from '../../assets';
import { activeOption } from '../../assets/styles/globalStyles';
import { screenNames } from '../../helper/screenNames';

function Header() {
  const navigate = useNavigation();
  const handleBack = useCallback(() => {
    navigate.navigate(screenNames.home);
  }, []);
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={handleBack}
        activeOpacity={activeOption}
      >
        <LeftIcon />
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity
        activeOpacity={activeOption}
      >
        <TabNavbarFrameIcon />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    color: '#000',
  },
});

export default Header;
