import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet, Image, ToastAndroid, View, Dimensions,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useSelector } from 'react-redux';
import Config from 'react-native-config';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import PropTypes from 'prop-types';
import CloseMapsScreensBtn from './CloseMapsScreensBtn';

function Maps({
  screenMapsShow,
  openScreenMapsToggle,
}) {
  const [userLocation, setUserLocation] = useState(null);
  const user = useSelector((state) => state.users.profile);
  const tour = useSelector((state) => state.tours.tourItem);
  const animatedValue = useSharedValue({
    height: 268,
    paddingHorizontal: 16,
    top: 0,
  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withTiming(animatedValue.value.height, {
        duration: 1000,
      }),
      paddingHorizontal: withTiming(animatedValue.value.paddingHorizontal, {
        duration: 1000,
      }),
      top: withTiming(animatedValue.value.top, {
        duration: 1000,
      }),
    };
  });
  useEffect(() => {
    if (screenMapsShow) {
      animatedValue.value = {
        height: Dimensions.get('screen').height,
        paddingHorizontal: 0,
        top: -150,
      };
    } else {
      animatedValue.value = {
        height: 268,
        paddingHorizontal: 16,
        top: 0,
      };
    }
  }, [screenMapsShow]);

  const handleMapsPress = useCallback(() => {
    openScreenMapsToggle(true);
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;
        setUserLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
      },
    );
  }, [userLocation]);
  const region = {
    latitude: 40.785301,
    longitude: 43.841637,
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={animatedStyles}
      >
        {
          userLocation
            ? (
              <MapView
                onPress={handleMapsPress}
                style={styles.map}

                initialRegion={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                  }}
                  title={`${user.firstName},${user.lastName}`}
                  description="This is the user's location"
                >
                  <Image
                    source={{
                      uri: user.photo.search('https') > -1
                        ? user.photo : `${Config.API_URL}${user.photo}`,
                    }}
                    style={styles.imagesUser}
                  />
                </Marker>

                <Marker
                  coordinate={region}
                  title={`${user.title}`}
                >
                  <Image
                    source={{
                      uri: `${Config.API_URL}${tour.featuredImage}`,
                    }}
                    style={styles.imagesUser}
                  />
                </Marker>
              </MapView>
            )
            : null
        }
      </Animated.View>
      <CloseMapsScreensBtn
        active={screenMapsShow}
        close={openScreenMapsToggle}
      />
    </View>
  );
}

Maps.propTypes = {
  screenMapsShow: PropTypes.bool.isRequired,
  openScreenMapsToggle: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  infoView: {
    width: 56,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#FFFF',
    fontSize: 12,
    lineHeight: 16,
  },
  imagesUser: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});
export default Maps;
