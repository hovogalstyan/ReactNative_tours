import React, { useCallback, useContext } from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { DoneIcon } from '../../assets';
import { OrderContext } from '../../screens/appScreen/OrderTour';

function CheckBox({ keys }) {
  const {
    setTour,
    tour,
  } = useContext(OrderContext);

  const handleToggleGid = useCallback(() => {
    setTour((prevState) => ({
      ...prevState,
      [keys]: !prevState[keys],
    }));
  }, [tour]);
  return (
    <TouchableOpacity
      onPress={handleToggleGid}
      style={styles.checks}
    >
      <Text style={styles.icon}>
        {
          tour[keys]
            ? <DoneIcon fill="#000" />
            : ''
        }
      </Text>
    </TouchableOpacity>
  );
}

CheckBox.propTypes = {
  keys: PropTypes.string.isRequired,
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
