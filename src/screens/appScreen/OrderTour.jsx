import React, {
  createContext, useCallback, useEffect, useState,
} from 'react';
import {
  SafeAreaView, StyleSheet, useWindowDimensions,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import CalendarModal from '../../components/orderTour/CalendarModal';
import ClientsModal from '../../components/orderTour/ClientsModal';
import Header from '../../components/orderTour/Header';
import Loading from '../../components/Loading';

export const OrderContext = createContext(null);

function OrderTour() {
  const [navigateState, setNavigateState] = useState('calendar');
  const [renderState, setRenderStet] = useState(true);
  const [tour, setTour] = useState({
    scheduleId: '',
    children3to10: 0,
    children11up: 0,
    adult: 1,
    gid: false,
  });

  const { height } = useWindowDimensions();
  const navigate = useNavigation();

  useEffect(() => {
    const time = setTimeout(() => {
      setRenderStet(false);
    }, 100);
    return () => clearTimeout(time);
  }, [renderState]);

  const calendarSharedValue = useSharedValue({
    top: 149,
    scale: 1,
  });

  const clientsSharedValue = useSharedValue({
    top: -height,
    scale: 0.5,
  });
  const handleBackHeader = useCallback(() => {
    if (navigateState === 'calendar') {
      return navigate.goBack();
    }
    if (navigateState === 'clients') {
      setNavigateState('calendar');
      clientsSharedValue.value = {
        top: -height,
        scale: 0.5,
      };
      calendarSharedValue.value = {
        top: 149,
        scale: 1,
      };
    }
  }, [navigateState]);
  if (renderState) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={styles.container}
    >

      <OrderContext.Provider value={{
        setTour,
        tour,
        navigateState,
        calendarSharedValue,
        clientsSharedValue,
        setNavigateState,
      }}
      >
        <Header onPress={handleBackHeader} />
        <CalendarModal />
        <ClientsModal />
      </OrderContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
});
export default OrderTour;
