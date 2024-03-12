import React, { useCallback } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { activeOption } from '../../assets/styles/globalStyles';
import { activeSettingsPage } from '../../store/actions/users';

function RenderItem({ item, index, handleActiveItem }) {
  const activeIndex = useSelector((state) => state.users.navbarPage);
  return (
    <TouchableOpacity
      activeOpacity={activeOption}
      onPress={handleActiveItem(index)}
      style={styles.item}
    >
      <Text style={
        index === activeIndex
          ? [styles.btnText, { color: '#FF9500' }] : styles.btnText
}
      >
        {item}
      </Text>
      {index === activeIndex ? <View style={styles.activeLine} /> : null}
    </TouchableOpacity>
  );
}
RenderItem.propTypes = {
  item: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleActiveItem: PropTypes.func.isRequired,
};
function Navbar({ pagerScroll }) {
  const settings = ['Profile settings', 'Password', 'My Document', 'Notification'];
  const dispatch = useDispatch();

  const handleActiveItem = useCallback((index) => () => {
    dispatch(activeSettingsPage(index));
    // eslint-disable-next-line react/prop-types
    if (pagerScroll.current) {
      // eslint-disable-next-line react/prop-types
      pagerScroll.current.scrollToIndex({ animated: true, index });
    }
  }, [pagerScroll]);

  return (
    <View style={styles.navbar}>
      <FlatList
        ref={pagerScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={settings}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            handleActiveItem={handleActiveItem}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

Navbar.propTypes = {
  pagerScroll: PropTypes.shape({}).isRequired,
};

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    paddingLeft: 14,
    borderBottomWidth: 1,
    borderColor: '#BEC0C2',

  },
  item: {
    marginRight: 30,
    paddingVertical: 16,
  },
  btnText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
  activeLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#FF9500',
    position: 'absolute',
    bottom: 0,
  },
});

export default Navbar;
