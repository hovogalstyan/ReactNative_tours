import React, { useEffect } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text, Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Config from 'react-native-config';
import PropTypes from 'prop-types';
import {
  tourCategoriseListRequired,
} from '../../store/actions/tours';

function TourHeader({
  handleFilter,
  categoryId,
}) {
  const dispatch = useDispatch();
  const tourCategoryList = useSelector((state) => state.tours.tourCategoryList);

  useEffect(() => {
    dispatch(tourCategoriseListRequired());
  }, []);

  return (
    <View
      style={styles.header}
    >
      {tourCategoryList
        && tourCategoryList.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={1}
            style={styles.btn}
            onPress={handleFilter(item)}
          >
            <Image
              source={{ uri: `${Config.API_URL}${item.icon}` }}
              style={styles.icon}
            />
            <Text style={[styles.text, {
              color: item.id === categoryId ? '#F79F1A' : '#002059'
              ,
            }]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

TourHeader.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 19,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 25,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
export default TourHeader;
