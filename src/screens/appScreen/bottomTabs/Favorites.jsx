import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Config from 'react-native-config';
import { activeOption } from '../../../assets/styles/globalStyles';
import TabScreenHeader from '../../../components/TabScreenHeader';
import {
  removeFavoritesStateItem,
  tourFavoritesListRequired,
  tourFavoritesRequired,
} from '../../../store/actions/tours';
import Loading from '../../../components/Loading';
import ScrollLoading from '../../../components/ScrollLoading';
import { screenNames } from '../../../helper/screenNames';

function Favorites() {
  const [page, setPage] = useState(1);
  const [scrollLoading, setScrollLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const favoritesRegulation = useSelector((state) => state.tours.favoritesRegulation);
  const loading = useSelector((state) => state.tours.loading);
  const favoritesList = useSelector((state) => state.tours.favoritesList);
  const handleEndReached = useCallback(() => {
    if (page <= favoritesRegulation.pages) {
      setPage(page + 1);
    }
  }, [favoritesRegulation, page]);

  useEffect(() => {
    setScrollLoading(true);
    dispatch(tourFavoritesListRequired(page))
      .finally(() => {
        setScrollLoading(false);
      });
  }, [page]);

  const deleteFavoritesItem = useCallback((tour) => () => {
    dispatch(tourFavoritesRequired({
      tourId: tour.id,
    }));
    dispatch(removeFavoritesStateItem(tour.id));
  }, []);

  const handleDescriptionTours = useCallback((item) => () => {
    navigate.navigate(screenNames.descriptionTours, {
      id: item.id,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TabScreenHeader title="Favorites" />
      {
        // eslint-disable-next-line no-nested-ternary
        loading && favoritesList.length <= 0 ? <Loading />
          // eslint-disable-next-line no-nested-ternary
          : favoritesList.length > 0
            ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={favoritesList}
                keyExtractor={(item) => item.id}
                style={styles.flotStyle}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <TouchableOpacity
                      onPress={handleDescriptionTours(item)}
                      activeOpacity={activeOption}
                    >
                      <Image
                        style={styles.images}
                        source={{ uri: `${Config.API_URL}${item.featuredImage}` }}
                      />
                    </TouchableOpacity>
                    <View style={styles.textRow}>
                      <View>
                        <Text style={styles.text}>
                          {item.title}
                          {' '}
                          (
                          {item.duration}
                          {' '}
                          days)
                          {' '}
                        </Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={activeOption}
                        onPress={deleteFavoritesItem(item)}
                      >
                        <Image source={require('../../../assets/png/deleteF.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                ListFooterComponent={() => {
                  return (
                    scrollLoading ? <ScrollLoading /> : null
                  );
                }}
              />
            )
            : null
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  item: {
    marginBottom: 25,
  },
  images: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 5,
  },
  textRow: {
    paddingTop: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
    fontSize: 18,
    color: '#002059',
  },
});

export default Favorites;
