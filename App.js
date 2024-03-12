import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { Profile } from './src/helper/profile';
import { updateUsersStorage } from './src/store/actions/users';
import Navigation from './src/screens/Navigation';
import Loading from './src/components/Loading';

if (!__DEV__) {
  console.log = () => undefined;
}

function App() {
  const [isLoadingToken, setIsLoadingToken] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = await Profile.getToken();
      const profile = await Profile.getUser();
      await dispatch(updateUsersStorage(token, JSON.parse(profile)));
      setIsLoadingToken(true);
      await SplashScreen.hide();
    })();
  }, []);

  if (!isLoadingToken) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

export default App;
