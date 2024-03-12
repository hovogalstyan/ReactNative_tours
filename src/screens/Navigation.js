import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import AppScreen from './appScreen/bottomTabs/appScreen';
import LogoutScreen from './authScreen/AurhScreen';
import { screenNames } from '../helper/screenNames';
import DescriptionTours from './appScreen/DescriptionTours';
import OrderTour from './appScreen/OrderTour';
import Settings from './appScreen/Settings';
import TourSearchScreen from './appScreen/TourSearchScreen';
import ResultsDestinationTourFilter from './appScreen/ResultsDestinationTourFilter';
import RouteTourMap from './appScreen/RouteTourMap';
import NavbarAnimtedOnPress from './NavbarAnimtedOnPress';
import PaymentScreen from './appScreen/PaymentScreen';

const Stack = createStackNavigator();

function Navigation() {
  const token = useSelector((state) => state.users.token);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="pocos" component={NavbarAnimtedOnPress} /> */}
      {token ? (
        <>
          <Stack.Screen
            name={screenNames.appScreen}
            component={AppScreen}
          />
          <Stack.Screen
            name={screenNames.descriptionTours}
            component={DescriptionTours}
          />
          <Stack.Screen
            name={screenNames.orderTour}
            component={OrderTour}
          />
          <Stack.Screen
            name={screenNames.tourSearchScreen}
            component={TourSearchScreen}
          />
          <Stack.Screen
            name={screenNames.settings}
            component={Settings}
          />
          <Stack.Screen
            name={screenNames.resultsTourFilter}
            component={ResultsDestinationTourFilter}
          />
          <Stack.Screen
            name={screenNames.routeTourMap}
            component={RouteTourMap}
          />
          <Stack.Screen
            name={screenNames.paymentScreen}
            component={PaymentScreen}
          />
        </>
      ) : (
        <Stack.Screen
          name={screenNames.authScreen}
          component={LogoutScreen}
        />
      )}

    </Stack.Navigator>
  );
}

export default Navigation;
