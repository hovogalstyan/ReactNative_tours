import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import React, { useCallback } from 'react';
import {
  Image, Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import Config from 'react-native-config';
import { AirbnbRating } from 'react-native-ratings';
import PropTypes from 'prop-types';
import { activeOption } from '../../assets/styles/globalStyles';
import { screenNames } from '../../helper/screenNames';
import { tourRatingRequired } from '../../store/actions/tours';

function TourItem({ item }) {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types
  const right = item.rating !== null ? item.rating : 1;
  const onStarRatingPress = useCallback((rate) => {
    dispatch(tourRatingRequired({
      rate,
      tourId: item.id,
    }));
  }, []);

  const handleDescriptionPage = useCallback((item) => () => {
    navigate.navigate(screenNames.descriptionTours, {
      id: item.id,
    });
  }, []);

  return (
    <View
      style={styles.item}
    >
      <Text
        style={styles.price}
      >
        {item.price}
        $
      </Text>
      <TouchableOpacity
        activeOpacity={activeOption}
        onPress={handleDescriptionPage(item)}
      >
        <Image
          source={{ uri: `${Config.API_URL}${item.featuredImage}` }}
          style={styles.images}
        />
      </TouchableOpacity>
      <View style={styles.bottomRow}>
        <Text
          style={styles.name}
        >
          {item.title}
        </Text>
        <AirbnbRating
          count={5}
          showRating={false}
          defaultRating={right}
          size={15}
          onFinishRating={onStarRatingPress}
        />
      </View>
      <Text
        numberOfLines={1}
        style={styles.desc}
      >
        {item.description}
      </Text>
    </View>
  );
}
TourItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};
const styles = StyleSheet.create({
  item: {
    marginBottom: 45,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  images: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  price: {
    position: 'absolute',
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#FF9500',
    right: 0,
    top: 80,
    borderRadius: 4,
    zIndex: 999,
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    color: '#002059',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  desc: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 15,
    color: '#052243',
  },
});
export default TourItem;
