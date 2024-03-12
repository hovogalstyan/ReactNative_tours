import React, { useCallback, useEffect, useState } from 'react';
import {
  ImageBackground, Text, TouchableOpacity, View,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { LeftIcon, MapIcon } from '../../assets';
import FavoriteButton from '../custom/FavoriteButton';
import { activeOption } from '../../assets/styles/globalStyles';
import { tourFavoritesRequired } from '../../store/actions/tours';
import { screenNames } from '../../helper/screenNames';

function Header({ item }) {
  const [favorite, setFavorite] = useState(false);
  const profileFavorite = useSelector((state) => state.users.profile.favorites);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileFavorite.includes(item.id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [profileFavorite]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleRouterScreen = useCallback(() => {
    navigation.navigate(screenNames.routeTourMap);
  }, []);

  const handleFavorite = useCallback(() => {
    setFavorite(!favorite);
    dispatch(tourFavoritesRequired({
      tourId: item.id,
    }));
  }, [favorite]);

  return (
    <ImageBackground
      source={{ uri: `${Config.API_URL}${item.featuredImage}` }}
      style={styles.images}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <LeftIcon />
        </TouchableOpacity>
        <FavoriteButton
          onPress={handleFavorite}
          active={favorite}
          style={styles.favorite}
        />
      </View>
      <View style={styles.textContent}>
        <View style={styles.contentRow}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity
              style={styles.btnMap}
              activeOpacity={activeOption}
              onPress={handleRouterScreen}
            >
              <MapIcon />
              <Text style={styles.btnText}>Show on the map</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.temperature}>+17</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

Header.propTypes = {
  // eslint-disable-next-line react/require-default-props
  item: PropTypes.shape({
    featuredImage: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
  }),
};
const styles = StyleSheet.create({
  images: {
    width: '100%',
    height: 270,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  favorite: {
    width: 27,
    height: 27,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnMap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingBottom: 0.5,
  },
  temperature: {
    fontWeight: '600',
    fontSize: 18,
    color: '#fff',
  },
});
export default Header;
