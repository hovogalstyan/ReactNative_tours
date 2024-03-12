import React, { useCallback } from 'react';
import {
  Modal, View, StyleSheet, Image, TouchableOpacity, useWindowDimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import Carousel from 'react-native-reanimated-carousel';
import { CloseIcon } from '../../assets';

function SliderGallery({
  isVisible,
  galleries = [],
  close,
}) {
  const { width } = useWindowDimensions();
  const handleClose = useCallback(() => {
    close(false);
  }, []);
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleClose}
          style={styles.close}
        >
          <CloseIcon fill="#fff" />
        </TouchableOpacity>
        <Carousel
          loop
          width={width}
          data={galleries}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={styles.images}
                source={{ uri: `${Config.API_URL}${item.src}` }}
              />
            </View>
          )}
        />
      </View>
    </Modal>
  );
}

SliderGallery.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  galleries: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    }),
  ),
};

SliderGallery.defaultProps = {
  galleries: [],
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 3,
    position: 'relative',
  },
  item: {
    justifyContent: 'center',
  },
  images: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 999,
  },
});
export default SliderGallery;
