import React, { useCallback, useState } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { activeOption } from '../../assets/styles/globalStyles';
import useToggle from '../hooks/useToggle';
import { ArrowDropDown, ArrowRight } from '../../assets';

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
function VerticalStepIndicatorItem({ item, index }) {
  const [heightLines, setHeightLines] = useState(1);
  const [showMoreDetailed, handleShowMoreToggle] = useToggle(false);

  const animatedValue = useSharedValue({
    height: heightLines,
  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withTiming(animatedValue.value.height, {
        duration: 300,
      }),
    };
  });

  const handleLayout = useCallback((event, index) => {
    const { height } = event.nativeEvent.layout;
    if (index !== data.length - 1) {
      animatedValue.value = {
        height: height + 7,
      };
    }
  }, [data, showMoreDetailed]);

  return (
    <View
      onLayout={(event) => handleLayout(event, index)}
      key={index}
      style={styles.stepIndicatorItem}
    >
      <View style={styles.lineNumContainer}>
        <View style={styles.lineNum}>
          <Text style={styles.numText}>{index + 1}</Text>
        </View>
      </View>
      {
        index !== data.length - 1
          ? (
            <Animated.View style={[{
              borderLeftWidth: 1,
              borderColor: 'red',
              borderStyle: 'dashed',
              position: 'absolute',
              top: 34,
              left: 17,
            }, animatedStyles]}
            />
          )
          : null
      }
      <View style={styles.textContent}>
        <Text style={styles.title}>{item.label}</Text>
        <Text style={styles.text}>{item.status}</Text>
        {
          item.detailed ? (
            <TouchableOpacity
              style={styles.moreBtn}
              activeOpacity={activeOption}
              onPress={handleShowMoreToggle}
            >
              <Text style={styles.moreText}>
                More detailed
              </Text>
              {
                  showMoreDetailed ? <ArrowDropDown /> : <ArrowRight />
                }
            </TouchableOpacity>
          ) : null
        }
        {showMoreDetailed ? <Text>{item.detailed}</Text> : null}
      </View>
    </View>
  );
}
VerticalStepIndicatorItem.propTypes = {
  index: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  item: PropTypes.shape({
    label: PropTypes.string,
    status: PropTypes.string,
    detailed: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  stepIndicatorItem: {
    marginBottom: 41,
    flexDirection: 'row',
  },
  lineNumContainer: {
    position: 'relative',
  },
  lineNum: {
    width: 34,
    height: 34,
    backgroundColor: '#FF9500',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  lines: {
    width: 1,
    position: 'absolute',
    backgroundColor: 'red',
    height: '100%',
  },
  textContent: {
    marginLeft: 10,
    width: '100%',
  },
  title: {
    fontWeight: '400',
    fontSize: 16,
    color: '#052243',
  },
  text: {
    fontWeight: '300',
    fontSize: 13,
    color: '#052243',
  },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontWeight: '300',
    fontSize: 13,
    color: '#052243',
    position: 'relative',
  },
});
export default VerticalStepIndicatorItem;
