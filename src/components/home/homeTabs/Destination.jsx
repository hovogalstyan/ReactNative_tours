import React, {
  useCallback,
  useEffect, useLayoutEffect,
} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { destinationListRequired, removeStateKeys } from '../../../store/actions/tours';
import Loading from '../../Loading';
import { activeOption } from '../../../assets/styles/globalStyles';
import { screenNames } from '../../../helper/screenNames';

function RenderItem({ item }) {
  const navigate = useNavigation();
  const handleFilterTour = useCallback((id) => () => {
    navigate.navigate(screenNames.resultsTourFilter, {
      id,
    });
  }, []);
  return (
    <TouchableOpacity
      onPress={handleFilterTour(item.id)}
      activeOpacity={activeOption}
    >
      <ImageBackground
        style={styles.images}
        source={{ uri: `${Config.API_URL}/${item.image}` }}
      >
        <Text style={styles.title}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

RenderItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

function Destination() {
  const destinationList = useSelector((state) => state.tours.destinationList);
  const isLoading = useSelector((state) => state.tours.loading);
  const categoryPage = useSelector((state) => state.tours.categoryPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryPage === 1) {
      dispatch(destinationListRequired());
    }
  }, [categoryPage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={styles.destination}
    >
      <FlatList
        data={destinationList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  destination: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,

  },
  images: {
    height: 161,
    marginBottom: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    resizeMode: 'cover',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
  favorite: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 50,
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Destination;
