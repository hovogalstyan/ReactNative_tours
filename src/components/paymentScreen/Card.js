import React, { useCallback, useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Image, Keyboard,
} from 'react-native';
import { CardField } from '@stripe/stripe-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { checkoutOrderRequired } from '../../store/actions/tours';
import { screenNames } from '../../helper/screenNames';

function PaymentScreen() {
  const orderItem = useSelector((state) => state.tours.orderItem);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [cardDetails, setCardDetails] = useState(null);
  const [statusRes, setStatusRes] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleCardChange = (cardDetails) => {
    setCardDetails(cardDetails);
  };

  const handlePayment = useCallback(async () => {
    if (cardDetails) {
      setLoading(true);
      setErrors({});
      const { payload } = await dispatch(checkoutOrderRequired({
        orderId: orderItem?.order.id,
      }))
        .finally(() => {
          setLoading(false);
        });
      if (payload.errors) {
        return setErrors(payload.errors);
      }
      if (payload?.status === 'ok') {
        setStatusRes(true);
        Keyboard.dismiss();
        setTimeout(() => {
          navigation.navigate(screenNames.home);
        }, 300);
      }
    } else {
      setErrors({
        card: 'is not allowed to be empty',
      });
    }
  }, [cardDetails]);

  return (
    <View style={styles.form}>
      <View style={styles.card}>
        <CardField
          postalCodeEnabled
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          onCardChange={handleCardChange}
          style={{
            width: '100%',
            height: 50,
          }}
        />
      </View>
      {
        errors.card ? <Text style={styles.errors}>{errors.card}</Text> : null
      }
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.pay}
        onPress={handlePayment}
      >
        {
          // eslint-disable-next-line no-nested-ternary
          loading
            ? <ActivityIndicator color="#fff" size="small" />
            : statusRes ? <Image source={require('../../assets/png/checkBoxIcon.png')} />
              : (
                <Text style={styles.peyText}>
                  Pay
                  {' '}
                  <Text style={styles.payAmount}>
                    {orderItem.totalPrice}
                    {' '}
                    AMD
                  </Text>
                </Text>
              )
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 185,
    paddingTop: 75,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.78)',
  },
  card: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 20,
    overflow: 'hidden',
  },
  pay: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  peyText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  payAmount: {
    fontSize: 14,
    fontWeight: '400',
  },
  errors: {
    fontSize: 14,
    color: 'red',
  },
});
export default PaymentScreen;
