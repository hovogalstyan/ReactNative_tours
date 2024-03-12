import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/orderTour/Header';
import Card from '../../components/paymentScreen/Card';
import { tourGetItemRequired } from '../../store/actions/tours';
import Loading from '../../components/Loading';

function PaymentScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { params } = useRoute();
  const navigation = useNavigation();
  const { id } = params;

  const handleHeaderBack = useCallback(() => {
    navigation.goBack();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(tourGetItemRequired(id))
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Header onPress={handleHeaderBack} />
      <StripeProvider
        urlScheme="booking"
        publishableKey="pk_test_51OKL12KvHljHP4lTNIlWWKMnC6uLRYJ3qmeHQ1MN4AmVjYQGyUvnkuFJJDM0u0HmDvLejFbiKHLReVb6fOzFgYr700IKklux8i"
      >
        <Card />
      </StripeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 125,
  },
});

export default PaymentScreen;
