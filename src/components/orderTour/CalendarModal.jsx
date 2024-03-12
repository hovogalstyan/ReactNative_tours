import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import {
  View, StyleSheet, Text, ScrollView, useWindowDimensions,
} from 'react-native';

import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import FormButton from '../custom/FormButton';
import { globalStyles } from '../../assets/styles/globalStyles';
import { OrderContext } from '../../screens/appScreen/OrderTour';
import { getDataFilter } from '../../helper/regexp';
import StartToEndDateText from './StartToEndDateText';

function CalendarModal() {
  const [dateError, setDateError] = useState(null);
  const tourDates = useSelector((state) => state.tours.tourItem.tourschedules);
  const [date, setDate] = useState('');
  const deliveryDates = getDataFilter(tourDates);
  const {
    setTour,
    tour,
    setNavigateState,
    calendarSharedValue,
    clientsSharedValue,
  } = useContext(OrderContext);
  const { height } = useWindowDimensions();

  const markedDates = useMemo(() => {
    return deliveryDates.reduce((acc, key) => {
      acc[key.date] = {
        selected: true,
        selectedColor: 'blue',
      };
      return acc;
    }, {});
  }, [deliveryDates]);

  const handleChange = useCallback((value) => {
    const index = deliveryDates.findIndex((item) => item.date === value.dateString);
    if (index === -1) {
      setDateError('Please select the pre-selected days');
    } else {
      setDateError(null);
      setDate(value.dateString);
      setTour({
        ...tour,
        scheduleId: tourDates[index].id,
      });
    }
  }, [deliveryDates, tourDates]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(calendarSharedValue.value.top, {
        duration: 300,
      }),
      transform: [
        { scale: withTiming(calendarSharedValue.value.scale, { duration: 190 }) },
      ],
    };
  });

  const handleNext = useCallback(() => {
    if (tour.scheduleId !== '') {
      if (dateError === null) {
        setDateError(null);
        setNavigateState('clients');
        calendarSharedValue.value = {
          top: height,
          scale: 0.5,
        };
        clientsSharedValue.value = {
          top: 105,
          scale: 1,
        };
      }
    } else {
      setDateError('Please specify the date!');
    }
  }, [tour]);

  return (
    <Animated.View style={[
      styles.container,
      animatedStyle,
    ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: height - 145,
        }}
      >
        <View style={styles.lineRow}>
          <View style={styles.line} />
        </View>
        <Text style={styles.title}>Select dates</Text>
        <Calendar
          style={styles.calendar}
          markedDates={markedDates}
          onDayPress={handleChange}
        />
        {dateError ? <Text style={styles.errorData}>{dateError}</Text> : null}
        <StartToEndDateText
          date={date}
          error={dateError}
        />
        <FormButton
          onPress={handleNext}
          title="Next"
          loading={false}
          style={[
            globalStyles.formButton,
            {
              marginBottom: 45,
            },
          ]}
        />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    position: 'absolute',
  },
  lineRow: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  line: {
    width: 50,
    height: 3,
    backgroundColor: '#A7A7A7',
  },
  title: {
    fontWeight: '800',
    fontSize: 22,
    color: '#0D2652',
    marginTop: 44,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.19)',
  },
  calendar: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.19)',
  },
  tabRows: {
    paddingVertical: 20,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabTitle: {
    fontWeight: '400',
    fontSize: 18,
    color: '#002059',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#002059',
  },
  errorData: {
    fontSize: 14,
    fontWeight: '400',
    color: 'red',
    lineHeight: 30,
  },
});
export default CalendarModal;
