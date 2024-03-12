import React, { useCallback, useContext } from 'react';
import {
  Image, Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { activeOption } from '../../assets/styles/globalStyles';
import imgInc from '../../assets/png/inc.png';
import imgDec from '../../assets/png/dec.png';
import { OrderContext } from '../../screens/appScreen/OrderTour';

function ClientsCountButtons({ keys }) {
  const {
    setTour,
    tour,
  } = useContext(OrderContext);

  const incrementCount = useCallback(() => {
    setTour((prevState) => ({
      ...prevState,
      [keys]: prevState[keys] + 1,
    }));
  }, [keys, tour]);

  const decrementCount = useCallback(() => {
    setTour((prevState) => ({
      ...prevState,
      [keys]: prevState[keys] - 1 >= 0 ? prevState[keys] - 1 : 0,
    }));
  }, [keys, tour]);

  return (
    <View style={styles.btnRow}>
      <TouchableOpacity
        onPress={decrementCount}
        activeOpacity={activeOption}
      >
        <Image source={imgDec} />
      </TouchableOpacity>
      <Text style={styles.numCount}>{tour[keys]}</Text>
      <TouchableOpacity
        onPress={incrementCount}
        activeOpacity={activeOption}
      >
        <Image source={imgInc} />
      </TouchableOpacity>
    </View>
  );
}
ClientsCountButtons.propTypes = {
  keys: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numCount: {
    fontWeight: '400',
    fontSize: 20,
    marginHorizontal: 10,
    color: '#FF9500',
  },
});
export default ClientsCountButtons;
