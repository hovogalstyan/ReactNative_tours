import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image, FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import TabScreenHeader from '../../../components/TabScreenHeader';
import { activeOption } from '../../../assets/styles/globalStyles';
import {
  orderListRequired,
} from '../../../store/actions/tours';
import { screenNames } from '../../../helper/screenNames';
import Loading from '../../../components/Loading';
import ScrollLoading from '../../../components/ScrollLoading';

function Trips() {
  const [page, setPage] = useState(1);
  const [scrollLoading, setScrollLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const ordersRegulation = useSelector((state) => state.tours.ordersRegulation);
  const loading = useSelector((state) => state.tours.loading);
  const orderList = useSelector((state) => state.tours.orderList);

  const handleEndReached = useCallback(() => {
    if (page <= ordersRegulation.pages) {
      setPage(page + 1);
    }
  }, [ordersRegulation, page]);

  useEffect(() => {
    setScrollLoading(true);
    dispatch(orderListRequired(page))
      .finally(() => {
        setScrollLoading(false);
      });
  }, [page]);

  const handlePaymentScreen = useCallback((item) => () => {
    if (item.status === 'pending') {
      navigate.navigate(screenNames.paymentScreen, {
        id: item?.tourschedule?.tourId,
      });
    } else {
      navigate.navigate(screenNames.descriptionTours, {
        id: item?.tourschedule?.tourId,
        checkout: 'pending',
      });
    }
  }, []);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <TabScreenHeader title="Trips" />
      {
        // eslint-disable-next-line no-nested-ternary
        loading && orderList.length <= 0 ? <Loading />
          // eslint-disable-next-line no-nested-ternary
          : orderList.length > 0
            ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={orderList}
                keyExtractor={(item) => item.id}
                style={styles.flotStyle}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <TouchableOpacity
                      activeOpacity={activeOption}
                      onPress={handlePaymentScreen(item)}
                    >
                      <Image
                        source={{ uri: `${Config.API_URL}${item?.tourschedule?.toure.featuredImage}` }}
                        style={styles.images}
                      />
                    </TouchableOpacity>
                    <View style={styles.textRow}>
                      <Text style={styles.name}>
                        {item?.tourschedule?.toure.title}
                        <Text
                          style={styles.days}
                        >
                          (
                          {item?.tourschedule?.toure.duration}
                          {' '}
                          days)
                        </Text>
                      </Text>
                      <Text style={styles.name}>
                        {item.totalAmount}
                        {' '}
                        AMD
                      </Text>
                    </View>
                    <View style={styles.checkout}>
                      {
                        item.status === 'active'
                          ? <Text style={styles.tourCheckout}>Tour paid for</Text>
                          : <Text style={styles.tourNotCheckout}>{'doesn\'t  paid for'}</Text>
                      }
                      <TouchableOpacity
                        activeOpacity={activeOption}
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
    marginBottom: 20,
  },
  images: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 5,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    color: '#002059',
  },
  days: {
    fontWeight: '400',
    marginLeft: 20,
  },
  checkout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  tourNotCheckout: {
    fontSize: 15,
    color: 'red',
    fontWeight: '600',
  },
  tourCheckout: {
    color: '#FCDC2A',
    fontWeight: '600',
    fontSize: 15,
  },
});
export default Trips;
