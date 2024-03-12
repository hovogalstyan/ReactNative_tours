import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text, TextInput, Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import { removeStateKeys, tourSearchRequired } from '../../store/actions/tours';
import Loading from '../../components/Loading';
import { activeOption } from '../../assets/styles/globalStyles';
import { screenNames } from '../../helper/screenNames';
import ScrollLoading from '../../components/ScrollLoading';

function TourSearchScreen() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const results = useSelector((state) => state.tours.tourSearchList);
  const errors = useSelector((state) => state.tours.errors);
  const tourSearchRegulation = useSelector((state) => state.tours.tourSearchRegulation);

  const handleEndReached = useCallback(() => {
    if (page < tourSearchRegulation.pages) {
      setPage(page + 1);
    }
  }, [tourSearchRegulation, page]);

  useEffect(() => {
    if (page >= 2) {
      setScrollLoading(true);
      dispatch(tourSearchRequired({
        page,
        search,
      }))
        .finally(() => {
          setScrollLoading(false);
        });
    }
  }, [page]);

  const handleSearch = useCallback(async () => {
    if (search === '') {
      dispatch(removeStateKeys('search'));
    }
    setLoading(true);
    dispatch(tourSearchRequired({
      page: 1,
      search,
    }))
      .finally(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    Keyboard.dismiss();
  }, [search]);

  const handleChange = useCallback((text) => {
    setSearch(text);
  }, []);

  const handleDescriptionTours = useCallback((item) => () => {
    navigate.navigate(screenNames.descriptionTours, {
      id: item.id,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={search}
          onChangeText={handleChange}
          placeholder="Search..."
          placeholderTextColor="#fff"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={styles.searchBtn}
        >
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      {errors.search ? <Text>{errors.search}</Text> : null}
      {
        loading
          ? <Loading />
          : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={results}
              onEndReached={handleEndReached}
              keyExtractor={(item) => item.id}
              style={styles.flotStyle}
              onEndReachedThreshold={0.1}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <TouchableOpacity
                    activeOpacity={activeOption}
                    onPress={handleDescriptionTours(item)}
                  >
                    <Image
                      source={{ uri: `${Config.API_URL}${item.featuredImage}` }}
                      style={styles.images}
                    />
                  </TouchableOpacity>
                  <View style={styles.textRow}>
                    <Text style={styles.name}>
                      {item.title}
                    </Text>
                    <Text style={styles.name}>
                      Category:
                      {' '}
                      {item.category.title}
                    </Text>
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
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flotStyle: {
    flex: 1,
    marginTop: 15,
    paddingBottom: 20,
  },
  item: {
    marginBottom: 20,
  },
  images: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 5,
  },
  textRow: {
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
  },
  header: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  input: {
    width: '83%',
    height: 55,
    backgroundColor: 'rgba(27,36,47,0.27)',
    paddingLeft: 7,
    fontSize: 16,
    color: '#fff',
    borderTopLeftRadius: 25,
  },
  searchBtn: {
    width: '17%',
    height: 55,
    backgroundColor: 'rgba(0,32,89,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default TourSearchScreen;
