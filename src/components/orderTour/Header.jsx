import React, { useCallback, useContext } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Image, ImageBackground, useWindowDimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { LeftIcon } from '../../assets';
import { OrderContext } from '../../screens/appScreen/OrderTour';
import { globalStyles } from '../../assets/styles/globalStyles';

function Header({ ...props }) {
  const profilePhoto = useSelector((state) => state.users.profile.photo);
  const featuredImage = useSelector((state) => state.tours.tourItem.featuredImage);

  return (
    <View style={styles.row}>
      <ImageBackground
        style={styles.images}
        source={{ uri: `${Config.API_URL}${featuredImage}` }}
      >
        <Animated.View
          entering={FadeIn.delay(400)}
          style={styles.header}
        >
          <TouchableOpacity {...props}>
            <LeftIcon />
          </TouchableOpacity>
          <Image
            source={{
              uri: profilePhoto.search('https') > -1
                ? profilePhoto : `${Config.API_URL}${profilePhoto}`,
            }}
            style={styles.img}
          />
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    position: 'absolute',
    width: '100%',
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  images: {
    width: '100%',
    height: 310,
    paddingVertical: 15,
  },
});
export default Header;
