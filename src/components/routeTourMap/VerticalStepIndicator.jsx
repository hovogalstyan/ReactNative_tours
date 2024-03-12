import React from 'react';
import {
  View, StyleSheet, FlatList, Text,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import VerticalStepIndicatorItem from './VerticalStepIndicatorItem';

const data = [
  {
    label: 'Begining',
    status: 'A shuttle service will be provided A shuttle service will be provided  ',
  },
  {
    label: 'Garni temple',
    status: '60 min - Entrace Ticket is notinccluded in the price 60',
    detailed: 'A shuttle service will be provided A shuttle service will be provided',
  },
  {
    label: 'The Monastery of Geghard ',
    status: '60 min.',
    detailed: 'A shuttle service will be provided A shuttle service will be provided',
  },
  {
    label: 'Begining',
    status: 'Meals are provided on this day',
  },
];

function VerticalStepIndicator() {
  return (
    <View style={styles.stepIndicator}>
      <Text style={styles.title}>1 Day: Garni  - Geghard</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          paddingBottom: 20,
        }}
        data={data}
        renderItem={({ item, index }) => (
          <VerticalStepIndicatorItem
            index={index}
            item={item}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stepIndicator: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 15,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#052243',
    marginBottom: 20,
  },
});
export default VerticalStepIndicator;
