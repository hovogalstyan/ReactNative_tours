import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import TabScreenHeader from '../../components/TabScreenHeader';
import OrderButton from '../../components/descriptionTours/OrderButton';
import VerticalStepIndicator from '../../components/routeTourMap/VerticalStepIndicator';
import { screenNames } from '../../helper/screenNames';
import Maps from '../../components/routeTourMap/Maps';

function RouteTourMap() {
  const [screenMapsShow, openScreenMapsToggle] = useState(false);
  const navigate = useNavigation();

  const handleOrderScreen = useCallback(() => {
    navigate.navigate(screenNames.orderTour);
  }, []);

  const animatedValueHeader = useSharedValue({
    top: 0,
  });
  const animatedHeaderStyles = useAnimatedStyle(() => {
    return {
      top: withTiming(animatedValueHeader.value.top, {
        duration: 1000,
      }),
    };
  });

  useEffect(() => {
    if (screenMapsShow) {
      animatedValueHeader.value = {
        top: -100,
      };
    } else {
      animatedValueHeader.value = {
        top: 0,
      };
    }
  }, [screenMapsShow]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[
        {
          paddingHorizontal: 16,
          paddingVertical: 16,
        },
        animatedHeaderStyles,
      ]}
      >
        <TabScreenHeader title="Router" />
      </Animated.View>
      <Maps
        screenMapsShow={screenMapsShow}
        openScreenMapsToggle={openScreenMapsToggle}
      />
      <VerticalStepIndicator />
      <OrderButton onPress={handleOrderScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default RouteTourMap;
