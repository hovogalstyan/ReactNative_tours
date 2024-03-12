import React, { useCallback, useEffect } from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle, useSharedValue, withRepeat, withTiming,
} from 'react-native-reanimated';
import { HeaderIconDrown, HeaderLogo } from '../../assets';
import { activeOption } from '../../assets/styles/globalStyles';
import { screenNames } from '../../helper/screenNames';
import { removeStateKeys } from '../../store/actions/tours';

function Header({ open }) {
  const profilePhoto = useSelector((state) => state.users.profile.photo);
  const categoryPage = useSelector((state) => state.tours.categoryPage);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const scale = useSharedValue(0);
  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const scaleSearch = useSharedValue(0);
  const scaleSearchStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSearch.value }],
  }));

  useEffect(() => {
    setTimeout(() => {
      scale.value = withRepeat(
        withTiming(scale.value + 1, { duration: 1000 }),
        1,
        false,
      );
    }, 400);
  }, []);

  useEffect(() => {
    if (categoryPage === 2) {
      setTimeout(() => {
        scaleSearch.value = withRepeat(
          withTiming(scale.value + 0.1, { duration: 1000 }),
          1,
          false,
        );
      }, 200);
    } else {
      scaleSearch.value = 0;
    }
  }, [categoryPage]);

  const openDrawerModal = useCallback(() => {
    open();
  }, []);

  const handleSearchTour = useCallback(() => {
    navigate.navigate(screenNames.tourSearchScreen);
    dispatch(removeStateKeys('search'));
  }, []);

  const handleSettings = useCallback(() => {
    navigate.navigate(screenNames.settings);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={activeOption}
          onPress={openDrawerModal}
        >
          <HeaderIconDrown width="24" height="24" />
        </TouchableOpacity>
        {
          categoryPage === 2
            ? (
              <Animated.View style={scaleSearchStyle}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.searchRow}
                  onPress={handleSearchTour}
                >
                  <Image
                    source={require('../../assets/images/search.png')}
                  />
                </TouchableOpacity>
              </Animated.View>
            )
            : (
              <View style={styles.title}>
                <Text style={styles.titleText}>Tra</Text>
                <Animated.View style={scaleStyles}>
                  <HeaderLogo width="38" height="39" />
                </Animated.View>
                <Text style={styles.titleText}>vel</Text>
              </View>
            )
        }
        {
          profilePhoto
            ? (
              <TouchableOpacity activeOpacity={activeOption} onPress={handleSettings}>
                <Image
                  source={{
                    uri: profilePhoto.search('https') > -1
                      ? profilePhoto : `${Config.API_URL}${profilePhoto}`,
                  }}
                  style={styles.userPhoto}
                />
              </TouchableOpacity>
            )
            : null
        }
      </View>
    </View>
  );
}

Header.propTypes = {
  open: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
  },
  titleText: {
    fontWeight: '400',
    fontSize: 22,
    lineHeight: 37.86,
    color: '#000',
  },
  userPhoto: {
    width: 24,
    height: 24,
    borderRadius: 111.11,
  },
  searchRow: {
    width: 158,
    paddingVertical: 7,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    borderRadius: 9.24,
    paddingHorizontal: 7,
  },
});
export default Header;
