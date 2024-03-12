import React, {
  useCallback, useEffect, useState,
} from 'react';
import {
  FlatList,
  StyleSheet, View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TourHeader from '../TourHeader';
import Loading from '../../Loading';
import TourItem from '../TourItem';
import ErrorsMessage from '../../ErrorsMessage';
import { toursListRequired } from '../../../store/actions/tours';
import ScrollLoading from '../../ScrollLoading';

function Tour() {
  const [categoryId, setCategoryId] = useState(1);
  const [page, setPage] = useState(1);
  const [toursList, setTours] = useState([]);
  const [scrollLoading, setScrollLoading] = useState(false);
  const tourRegulation = useSelector((state) => state.tours.tourRegulation);
  const categoryPage = useSelector((state) => state.tours.categoryPage);
  const isLoading = useSelector((state) => state.tours.loading);
  const errors = useSelector((state) => state.tours.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setScrollLoading(true);
      if (categoryPage === 2) {
        const { payload: { tours } } = await dispatch(toursListRequired({
          catId: categoryId,
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
      } else {
        setTours([]);
        setPage(1);
      }
    })();
  }, [categoryPage, page, categoryId]);

  const handleEndReached = useCallback(() => {
    if (page < tourRegulation.pages) {
      setPage(page + 1);
    }
  }, [tourRegulation, page]);

  const handleFilter = useCallback((item) => () => {
    setCategoryId(item.id);
    setTours([]);
    setPage(1);
  }, []);

  return (
    <View
      style={styles.tour}
    >
      <TourHeader
        handleFilter={handleFilter}
        page={page}
        setPage={setPage}
        categoryId={categoryId}
      />

      {
        // eslint-disable-next-line no-nested-ternary
        isLoading && toursList.length <= 0 ? <Loading />
          // eslint-disable-next-line no-nested-ternary
          : toursList.length > 0
            ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={toursList}
                renderItem={({ item }) => <TourItem item={item} />}
                keyExtractor={(item) => item.id}
                style={styles.flotStyle}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => {
                  return (
                    scrollLoading ? <ScrollLoading /> : null
                  );
                }}
              />
            )
            : errors.tourNodeFound ? (
              <ErrorsMessage message={errors.tourNodeFound} />
            ) : null
      }

    </View>
  );
}

const styles = StyleSheet.create({
  tour: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    paddingHorizontal: 16,
  },
});
export default Tour;
