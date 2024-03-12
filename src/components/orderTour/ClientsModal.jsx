import React, { useCallback, useContext, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View,
} from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ClientsCountButtons from './ClientsCountButtons';
import FormButton from '../custom/FormButton';
import { globalStyles } from '../../assets/styles/globalStyles';
import { OrderContext } from '../../screens/appScreen/OrderTour';
import CheckBoxOrder from '../custom/CheckBoxOrder';
import { orderTourRequired } from '../../store/actions/tours';
import { screenNames } from '../../helper/screenNames';

function ClientsModal() {
  const tourId = useSelector((state) => state.tours.tourItem.id);
  const loading = useSelector((state) => state.tours.loading);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const {
    clientsSharedValue,
    tour,
  } = useContext(OrderContext);
  const { height } = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(clientsSharedValue.value.top, {
        duration: 300,
      }),
      transform: [
        { scale: withTiming(clientsSharedValue.value.scale, { duration: 300 }) },
      ],
    };
  });
  const handleOrderTour = useCallback(async () => {
    const { payload } = await dispatch(orderTourRequired({
      ...tour,
      id: tourId,
    }));
    if (payload.errors) {
      return setErrors(payload.errors.error);
    }
    navigate.navigate(screenNames.paymentScreen, {
      id: tourId,
    });
  }, [tour]);

  const handleCheckoutScreen = useCallback(() => {
    navigate.navigate(screenNames.trips);
  }, []);

  return (
    <Animated.View style={[
      animatedStyle,
      styles.container,
    ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: height - 105,
        }}
      >
        <View style={styles.lineRow}>
          <View style={styles.line} />
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.title}>Adults</Text>
            <Text style={styles.text}>Entrance tickets</Text>
          </View>
          <ClientsCountButtons
            keys="adult"
          />
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.title}>Children (+11)</Text>
            <Text style={styles.text}>Entrance tickets</Text>
            <Text style={styles.text}>10$ per person</Text>
          </View>
          <ClientsCountButtons
            keys="children11up"
          />
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.title}>Children (3-10)</Text>
            <Text style={styles.text}>Entrance tickets</Text>
          </View>
          <ClientsCountButtons
            keys="children3to10"
          />
        </View>

        <View style={styles.item}>
          <View>
            <View style={styles.checkBox}>
              <CheckBoxOrder keys="gid" />
              <Text style={styles.titleCheck}>
                Guide service
              </Text>
            </View>
            <Text style={styles.textCheck}>Armenian, Russian,English</Text>
          </View>
          <Text style={styles.price}>150$</Text>
        </View>

        <View style={styles.item}>
          <View>
            <View style={styles.checkBox}>
              <CheckBoxOrder keys="comfort" />
              <Text style={styles.titleCheck}>
                Comfort Sedan (1-3 pax)
              </Text>
            </View>
            <Text style={styles.textCheck}>Mersedes-Benz C-class</Text>
          </View>
        </View>
        {
          errors ? (
            <View style={styles.errorRow}>
              <Text style={styles.errorText}>
                {errors}
              </Text>
              <TouchableOpacity onPress={handleCheckoutScreen}>
                <Text style={styles.btnErrorText}>Trips</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        <FormButton
          onPress={handleOrderTour}
          style={[globalStyles.formButton, {
            marginTop: 30,
            marginBottom: 50,
          }]}
          title="Next"
          loading={loading}
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
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 15,
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
  item: {
    paddingVertical: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.19)',
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    color: '#000',
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleCheck: {
    fontWeight: '600',
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
  price: {
    fontWeight: '700',
    fontSize: 20,
    color: '#000',
  },
  textCheck: {
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
  errorRow: {
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginRight: 8,
  },
  btnErrorText: {
    color: 'blue',
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
  },
});
export default ClientsModal;
