import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function StartToEndDateText({
  date,
  error,
}) {
  const tourDates = useSelector((state) => state.tours.tourItem.tourschedules);
  const tourDuration = useSelector((state) => state.tours.tourItem.duration);
  const startGetDateNames = useMemo(() => {
    if (date !== '' && !error) {
      // eslint-disable-next-line no-use-before-define
      const currentDate = new Date(date);
      const year = currentDate.getFullYear();
      const monthName = months[currentDate.getMonth()];
      const dayName = days[currentDate.getDay()];
      const dates = currentDate.getDate();
      return {
        month: monthName,
        day: dayName,
        date: dates,
        year,
      };
    }
    return null;
  }, [date, days, months, error]);

  const getDateAfterDays = useMemo(() => {
    if (date !== '' && !error) {
      const futureDate = new Date(date);
      futureDate.setDate(futureDate.getDate() + tourDuration);
      const year = futureDate.getFullYear();
      const monthName = months[futureDate.getMonth()];
      const dayName = days[futureDate.getDay()];
      const dates = futureDate.getDate();
      return {
        month: monthName,
        day: dayName,
        date: dates,
        year,
      };
    }
    return null;
  }, [date, tourDuration, days, months, error]);

  const getCurrentDate = useMemo(() => {
    if (date !== '' && !error) {
      const checkDate = new Date(date);
      // eslint-disable-next-line array-callback-return
      return tourDates?.find((item) => {
        const getDate = new Date(item.date);
        if (getDate.getFullYear() === checkDate.getFullYear()
          && getDate.getDate() === checkDate.getDate()
          && getDate.getMonth() === checkDate.getMonth()
        ) {
          return item;
        }
      });
    }
    return undefined;
  }, [date, tourDates, error]);

  const getCurrentDateTime = useMemo(() => {
    if (getCurrentDate) {
      const currentDate = new Date(getCurrentDate.date);
      const hours = (`0${currentDate.getHours()}`).slice(-2);
      const minutes = (`0${currentDate.getMinutes()}`).slice(-2);
      return `${hours}:${minutes}`;
    }
    return null;
  }, [getCurrentDate]);

  return (
    <View style={styles.dateResults}>
      <View>
        <Text style={styles.titleDateTour}>Start Tour Date...</Text>
        <Text style={styles.tourDateText}>
          Year:
          {' '}
          {
            startGetDateNames ? (
              <Text style={styles.getTextResult}>
                {startGetDateNames.year}
              </Text>
            ) : '.....'
          }
        </Text>
        <Text style={styles.tourDateText}>
          Month:
          {' '}
          {
            startGetDateNames ? (
              <Text style={styles.getTextResult}>
                {startGetDateNames.month}
              </Text>
            ) : '.....'
          }
        </Text>
        <Text style={styles.tourDateText}>
          Days:
          {' '}
          {
            startGetDateNames ? (
              <Text style={styles.getTextResult}>
                {startGetDateNames.day}
              </Text>
            ) : '.....'
          }
        </Text>
        <Text style={styles.tourDateText}>
          Date:
          {' '}
          {
            startGetDateNames ? (
              <Text style={styles.getTextResult}>
                {startGetDateNames.date}
              </Text>
            ) : '.....'
          }
        </Text>
        <Text style={styles.tourDateText}>
          Start Time:
          {' '}
          {
            getCurrentDateTime ? (
              <Text style={styles.getTextResult}>
                {getCurrentDateTime}
              </Text>
            ) : '.....'
          }
        </Text>
      </View>
      <View>
        <Text style={styles.titleDateTour}>End Tour Date...</Text>
        <Text style={styles.tourDateText}>
          Year:
          {' '}
          {
            getDateAfterDays ? (
              <Text style={styles.getTextResult}>
                {getDateAfterDays.year}
              </Text>
            ) : '.....'
          }
        </Text>
        <Text style={styles.tourDateText}>
          Month:
          {' '}
          {
            getDateAfterDays ? (
              <Text style={styles.getTextResult}>
                {getDateAfterDays.month}
              </Text>
            ) : '.....'
          }
        </Text>
        <Text style={styles.tourDateText}>
          Days:
          {' '}
          {
            getDateAfterDays ? (
              <Text style={styles.getTextResult}>
                {getDateAfterDays.day}
              </Text>
            ) : '.....'
          }
        </Text>
        <Text style={styles.tourDateText}>
          Date:
          {' '}
          {
            getDateAfterDays ? (
              <Text style={styles.getTextResult}>
                {getDateAfterDays.date}
              </Text>
            ) : '.....'
          }
        </Text>
        <Text style={styles.tourDateText}>
          Start Time:
          {' '}
          {
            getCurrentDateTime ? (
              <Text style={styles.getTextResult}>
                {getCurrentDateTime}
              </Text>
            ) : '.....'
          }
        </Text>
      </View>
    </View>
  );
}

StartToEndDateText.propTypes = {
  date: PropTypes.string.isRequired,
  error: PropTypes.string,
};
StartToEndDateText.defaultProps = {
  error: null,
};
const styles = StyleSheet.create({
  dateResults: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleDateTour: {
    fontWeight: '700',
    fontSize: 18,
    color: '#002059',
    marginBottom: 8,
  },
  tourDateText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#002059',
    marginBottom: 5,
  },
  getTextResult: {
    fontWeight: '400',
    fontSize: 16,
    color: '#002059',
  },
});
export default StartToEndDateText;
