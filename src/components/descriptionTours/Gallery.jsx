import React, { useCallback } from 'react';
import {
  Image, Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import Config from 'react-native-config';
import PropTypes from 'prop-types';
import { activeOption } from '../../assets/styles/globalStyles';

function Gallery({ galleries = [], setSlideModal }) {
  const handleOpenSlide = useCallback(() => {
    setSlideModal(true);
  }, []);
  return (
    <View style={styles.galleryVi}>
      <Text style={styles.title}>Gallery</Text>
      {
        // eslint-disable-next-line react/prop-types
        galleries && galleries.length >= 3
          ? (
            <TouchableOpacity
              onPress={handleOpenSlide}
              style={styles.galleryList}
              activeOpacity={activeOption}
            >
              <View>
                <Image
                  style={styles.galleryImgLeft}
                  source={{ uri: `${Config.API_URL}${galleries[0].src}` }}
                />
                <Image
                  style={styles.galleryImgLeft}
                  source={{ uri: `${Config.API_URL}${galleries[1].src}` }}
                />
              </View>
              <Image
                style={styles.galleryImgRight}
                source={{ uri: `${Config.API_URL}${galleries[2].src}` }}
              />
            </TouchableOpacity>
          )
          : (
            <View>
              {
                // eslint-disable-next-line react/prop-types
                galleries.length !== 0
                && (
                <Image
                  style={styles.galleryImg}
                  source={{ uri: `${Config.API_URL}${galleries[0].src}` }}
                />
                )
              }
            </View>
          )
      }
    </View>
  );
}
Gallery.propTypes = {
  galleries: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    }),
  ),
  setSlideModal: PropTypes.func.isRequired,
};
Gallery.defaultProps = {
  galleries: [],
};
const styles = StyleSheet.create({
  galleryVi: {
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    color: '#0D2652',
    marginBottom: 10,
  },
  galleryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  galleryImgLeft: {
    width: 184,
    height: 105,
    borderRadius: 10,
    marginBottom: 14,
  },
  galleryImgRight: {
    width: 168,
    height: 224,
    borderRadius: 10,
  },
  galleryImg: {
    width: '100%',
    height: 224,
    borderRadius: 10,
  },
});
export default Gallery;
