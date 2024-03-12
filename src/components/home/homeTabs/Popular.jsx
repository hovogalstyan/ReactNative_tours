import React, { useEffect } from 'react';
import {
  StyleSheet, ScrollView, View, Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PopularList from '../PopularList';
import BookList from '../BookList';
import { tourPopularsListRequired } from '../../../store/actions/tours';

function Popular() {
  const loading = useSelector((state) => state.tours.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tourPopularsListRequired(1));
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.popular}
    >
      {
        !loading
          ? (
            <>
              <PopularList />
              <BookList />
            </>
          )
          : (
            <View style={styles.popularContainerLod}>
              <View style={styles.popularSlideLod}>
                <View>
                  <View style={styles.imagesEffect} />
                  <View style={{
                    width: '100%',
                    paddingVertical: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  >
                    <View>
                      <Text style={{
                        width: 120,
                        height: 7,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                      }}
                      />
                      <Text style={{
                        width: 90,
                        height: 7,
                        marginTop: 5,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                      }}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <View style={styles.imagesEffectOne} />
                  <View style={{
                    width: '100%',
                    paddingVertical: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  >
                    <View>
                      <Text style={{
                        width: 120,
                        height: 7,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                      }}
                      />
                      <Text style={{
                        width: 90,
                        height: 7,
                        marginTop: 5,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                      }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.bottomRorLod}>
                <Text style={{
                  width: 135,
                  height: 5,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  marginBottom: 28,
                }}
                />
                <View style={styles.bottomRorItemLod} />
                <View style={styles.bottomRorItemLod} />
                <View style={styles.bottomRorItemLod} />
                <View style={styles.bottomRorItemLod} />
              </View>
            </View>
          )
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  popular: {
    flex: 1,
    backgroundColor: '#fff',
  },
  popularContainerLod: {
    flex: 1,
    paddingVertical: 25,
  },
  popularSlideLod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
  },
  imagesEffect: {
    width: 195,
    height: 105,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
  },
  imagesEffectOne: {
    width: 140,
    height: 105,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
  },
  bottomRorLod: {
    paddingTop: 35,
    paddingHorizontal: 16,
  },
  bottomRorItemLod: {
    height: 64,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    marginBottom: 28,
  },
});
export default Popular;
