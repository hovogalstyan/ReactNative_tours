import React, { useCallback } from 'react';
import {
  FlatList, Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import { AirbnbRating } from 'react-native-ratings';
import { activeOption } from '../../assets/styles/globalStyles';
import { screenNames } from '../../helper/screenNames';

function PopularList() {
  const popularList = useSelector((state) => state.tours.popularsList);
  const navigate = useNavigation();
  const handleDescription = useCallback((item) => () => {
    navigate.navigate(screenNames.descriptionTours, {
      id: item.id,
    });
  }, []);

  return (
    <View
      style={styles.popularRow}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          zIndex: 999,
          paddingVertical: 22.45,
        }}
        data={popularList}
        renderItem={({ item }) => {
          return (
            <View
              style={styles.item}
            >
              <TouchableOpacity
                activeOpacity={activeOption}
                onPress={handleDescription(item)}
              >
                <Image
                  source={{ uri: `${Config.API_URL}${item.featuredImage}` }}
                  style={styles.images}
                />
              </TouchableOpacity>
              <View style={styles.contentText}>
                <View>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text style={styles.desc}>{item.category.title}</Text>
                </View>
                <View>
                  <Text style={styles.price}>
                    {item.price}
                    $
                  </Text>
                  <Text style={styles.dey}>
                    {item.duration}
                    {' '}
                    day
                  </Text>
                </View>
              </View>
              <View />
              <View style={styles.starRow}>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  defaultRating={5}
                  size={15}
                  isDisabled
                />
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  popularRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 22.45,
    paddingLeft: 16,
    zIndex: 999,
  },
  item: {
    marginRight: 41,
  },
  images: {
    width: 195,
    height: 105,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
  },

  contentText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderBottomWidth: 0.7,
    borderColor: 'D6D6D6',
  },
  name: {
    fontWeight: '700',
    color: '#052243',
    fontSize: 18,
  },
  des: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 15,
  },
  price: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: '#0D2652',
  },
  dey: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 22,
    color: '#0D2652',
  },
  starRow: {
    flexDirection: 'row',
    paddingVertical: 5,

  },
});

export default PopularList;
