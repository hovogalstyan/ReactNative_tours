import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  StyleSheet, SafeAreaView, FlatList, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { tourFilterListRequired } from '../../store/actions/tours';
import TourItem from '../../components/home/TourItem';
import Loading from '../../components/Loading';
import ErrorsMessage from '../../components/ErrorsMessage';
import { LeftIcon } from '../../assets';
import { activeOption } from '../../assets/styles/globalStyles';
import ScrollLoading from '../../components/ScrollLoading';

function ResultsDestinationTourFilter() {
  const [page, setPage] = useState(1);
  const [tours, setTours] = useState([]);
  const [scrollLoading, setScrollLoading] = useState(false);
  const tourFilterRegulation = useSelector((state) => state.tours.tourFilterRegulation);
  const loading = useSelector((state) => state.tours.loading);
  const errors = useSelector((state) => state.tours.errors);

  const { params } = useRoute();
  const dispatch = useDispatch();
  const { id } = params;
  const navigate = useNavigation();

  useEffect(() => {
    (async () => {
      setScrollLoading(true);
      const { payload: { tours: toursList } } = await dispatch(tourFilterListRequired({
        destinationId: id,
        page,
      })).finally(() => {
        setScrollLoading(false);
      });
      const data = [...toursList, ...tours];
      const uniqueData = data.reduce((unique, current) => {
        if (!unique.has(current.id)) {
          unique.set(current.id, current);
        }
        return unique;
      }, new Map());
      setTours(Array.from(uniqueData.values()));
    })();
  }, [page, id]);

  const handleBack = useCallback(() => {
    navigate.goBack();
  }, []);

  const handleEndReached = useCallback(() => {
    if (page < tourFilterRegulation.pages) {
      setPage(page + 1);
    }
  }, [tourFilterRegulation, page]);

  if (loading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {
        errors.tourFilterNodeFound ? (
          <>
            <ErrorsMessage message={errors.tourFilterNodeFound} />
            <TouchableOpacity
              style={styles.back}
              activeOpacity={activeOption}
              onPress={handleBack}
            >
              <LeftIcon />
            </TouchableOpacity>
          </>
        ) : (
          <FlatList
            data={tours}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <TourItem item={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
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
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  back: {
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ResultsDestinationTourFilter;
