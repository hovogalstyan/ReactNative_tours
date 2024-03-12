import React, { useCallback } from 'react';
import {
  TouchableOpacity, StyleSheet, View, Text, Image, useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import {
  CloseIcon,
  RightIcon,
} from '../../assets';
import { Profile } from '../../helper/profile';
import { clearUsersState } from '../../store/actions/users';
import { screenNames } from '../../helper/screenNames';
import { activeCategoryPage } from '../../store/actions/tours';

const data = [
  {
    id: 1,
    name: 'Home',
    icon: require('../../assets/png/DrawerHome.png'),
  },
  {
    id: 2,
    name: 'Tours',
    icon: require('../../assets/png/DrawerTour.png'),
  },
  {
    id: 3,
    name: 'Hotels',
    icon: require('../../assets/png/DrawerHotels.png'),
  },
  {
    id: 4,
    name: 'Rest',
    icon: require('../../assets/png/DrawerRest.png'),
  },
  {
    id: 5,
    name: 'Settings',
    icon: require('../../assets/png/DrawerSettings.png'),
  },
  {
    id: 6,
    name: 'Payment method',
    icon: require('../../assets/png/DrowerPayment.png'),
  },
  {
    id: 7,
    name: 'Operation history',
    icon: require('../../assets/png/DrowerOperation.png'),
  },

];

function DrawerNavbarModal({
  animatedStylesDrawer,
  drawerValue,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    width,
    height,
  } = useWindowDimensions();

  const handleCloseModal = useCallback(() => {
    drawerValue.value = {
      left: -width - 60,
      scale: 0.8,
    };
  }, []);

  const handleNavItemPress = useCallback((index, item) => () => {
    if (item.name === 'Tours') {
      dispatch(activeCategoryPage(2));
    }
    if (item.name === 'Settings') {
      navigation.navigate(screenNames.settings);
    }
    handleCloseModal();
  }, []);

  const handleLogOut = useCallback(async () => {
    await Profile.clear();
    dispatch(clearUsersState());
  }, []);

  return (
    <Animated.View style={[
      styles.row, animatedStylesDrawer, {
        width: width - 60,
        height,
      }]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.closeBtn}
        onPress={handleCloseModal}
      >
        <CloseIcon />
      </TouchableOpacity>
      <View style={styles.itemRow}>
        {
          data.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.2}
              onPress={handleNavItemPress(index, item)}
              style={styles.item}
              key={item.id}
            >
              <View style={styles.leftRow}>
                <Image source={item.icon} />
                <Text style={styles.title}>{item.name}</Text>
              </View>
              <RightIcon />
            </TouchableOpacity>
          ))
        }
        <View
          style={styles.bottomRow}
        >
          <Text
            style={styles.bottomTitle}
          >
            Help and support
          </Text>
          <TouchableOpacity
            style={styles.btnBottom}
          >
            <Image source={require('../../assets/png/DrawerContact.png')} />
            <Text
              style={styles.title}
            >
              Contatcs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnBottom}
          >
            <Image source={require('../../assets/png/DrawerSupport.png')} />
            <Text
              style={styles.title}
            >
              24/7 Support
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logOut}>
          <TouchableOpacity
            style={styles.btnBottom}
          >
            <Image source={require('../../assets/png/DrawerLanguage.png')} />
            <Text
              style={styles.title}
            >
              Language
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogOut}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                styles.logOutTitle,
                {
                  borderBottomWidth: 1,
                  borderColor: '#052243',
                },
              ]}
            >
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

DrawerNavbarModal.propTypes = {

};

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 999,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 25,
  },
  itemRow: {
    paddingTop: 65,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '300',
    fontSize: 16,
    color: '#052243',
    marginLeft: 12,
  },
  bottomRow: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingVertical: 6,
  },
  bottomTitle: {
    fontWeight: '500',
    fontSize: 16,
    color: '#052243',
  },
  btnBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
  },
  logOut: {
    paddingHorizontal: 16,
  },
  logOutTitle: {
    fontWeight: '300',
    fontSize: 16,
    color: '#052243',
  },
});
export default DrawerNavbarModal;
