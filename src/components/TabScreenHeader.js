import React, { useCallback } from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { activeOption } from '../assets/styles/globalStyles';
import { LeftIcon } from '../assets';

function TabScreenHeader({ title }) {
  const navigate = useNavigation();
  const handleBach = useCallback(() => {
    navigate.goBack();
  }, []);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={handleBach}
        activeOpacity={activeOption}
      >
        <LeftIcon />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.def} />
    </View>
  );
}
TabScreenHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 28,
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    color: '#002059',
  },
  def: {
    width: '7%',
  },
});
export default TabScreenHeader;
