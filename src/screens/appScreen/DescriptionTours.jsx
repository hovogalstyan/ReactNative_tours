import React, { useCallback, useEffect, useState } from 'react';
import {
  Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Gallery from '../../components/descriptionTours/Gallery';
import Header from '../../components/descriptionTours/Header';
import useToggle from '../../components/hooks/useToggle';
import OrderButton from '../../components/descriptionTours/OrderButton';
import { screenNames } from '../../helper/screenNames';
import { tourGetItemRequired } from '../../store/actions/tours';
import Loading from '../../components/Loading';
import SliderGallery from '../../components/descriptionTours/SliderGallery';

function DescriptionTours() {
  const [showText, handleShowTextToggle] = useToggle(false);
  const [slideModal, setSlideModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tour = useSelector((state) => state.tours.tourItem);
  const dispatch = useDispatch();
  const { params } = useRoute();
  const navigation = useNavigation();
  const { id, checkout } = params;

  useEffect(() => {
    setIsLoading(true);
    dispatch(tourGetItemRequired(id)).finally(() => {
      setIsLoading(false);
    });
  }, [id]);

  const handleOrderScreen = useCallback(() => {
    navigation.navigate(screenNames.orderTour);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <SliderGallery
        isVisible={slideModal}
        galleries={tour.galleries}
        close={setSlideModal}
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Header
          item={tour}
        />
        <View style={styles.priceView}>
          <View style={styles.priceItem}>
            <View style={styles.imagesPrice}>
              <Image source={require('../../assets/png/price.png')} />
            </View>
            <View style={styles.textVi}>
              <Text style={styles.priceNum}>
                {tour.price}
                $
              </Text>
              <Text style={styles.priceText}>Price</Text>
            </View>
          </View>
          <View style={styles.priceItem}>
            <View style={styles.imagesPrice}>
              <Image source={require('../../assets/png/horse.png')} />
            </View>
            <View style={styles.textVi}>
              <Text style={styles.priceNum}>
                {tour.duration}
                {' '}
                hours
              </Text>
              <Text style={styles.priceText}>Duration</Text>
            </View>
          </View>
        </View>
        <View style={styles.descriptionVi}>
          <Text style={styles.titles}>Description</Text>
          <Text
            style={styles.decText}
            onPress={showText ? handleShowTextToggle : null}
          >
            {
              // eslint-disable-next-line no-nested-ternary
              tour.description
                ? showText ? tour.description
                  : `${tour.description.substring(0, 70)}...`
                : null
            }
            {
              // eslint-disable-next-line no-nested-ternary
              tour.description?.length > 70
                ? !showText
                  ? (
                    <Text
                      onPress={handleShowTextToggle}
                      style={styles.btnMoreTitle}
                    >
                      More
                    </Text>
                  ) : null
                : null
            }
          </Text>
        </View>
        <Gallery
          galleries={tour.galleries}
          setSlideModal={setSlideModal}
        />
        {
          !checkout ? <OrderButton onPress={handleOrderScreen} /> : null
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priceView: {
    paddingTop: 41,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceItem: {
    backgroundColor: '#FF9500',
    borderRadius: 10,
    width: 121,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 17,
  },
  imagesPrice: {
    padding: 6,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
  },
  textVi: {
    alignItems: 'center',
  },
  priceNum: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
  },
  priceText: {
    fontWeight: '300',
    fontSize: 13,
    color: '#fff',
  },
  descriptionVi: {
    paddingHorizontal: 13,
    width: 400,
  },
  titles: {
    fontWeight: '700',
    fontSize: 17,
    color: '#0D2652',
    marginBottom: 10,
  },
  decText: {
    fontWeight: '300',
    width: '100%',
    fontSize: 16,
    color: '#052243',
  },
  btnMoreTitle: {
    fontWeight: '800',
    fontSize: 16,
    color: '#000',
    marginRight: 15,
  },
});
export default DescriptionTours;
