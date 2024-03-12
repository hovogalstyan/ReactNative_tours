import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';
import { screenNames } from '../../helper/screenNames';
import ForgotPassword from './ForgotPassword';

const Stack = createStackNavigator();
function LogoutScreen() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name={screenNames.login} component={Login} />
      <Stack.Screen name={screenNames.register} component={Register} />
      <Stack.Screen name={screenNames.forgotPassword} component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export default LogoutScreen;
