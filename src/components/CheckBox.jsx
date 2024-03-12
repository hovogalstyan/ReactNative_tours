import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { DoneIcon } from '../assets';

function CheckBox({ active, handleToggle, color }) {
  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={styles.checks}
    >
      <Text style={styles.icon}>
        {
        active
          ? <DoneIcon fill={color || '#000'} />
          : ''
      }
      </Text>
    </TouchableOpacity>
  );
}

CheckBox.propTypes = {
  active: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  checks: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    left: -5,
    top: -6,
  },
});
export default CheckBox;
