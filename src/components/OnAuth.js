import React, { useCallback } from 'react';
import {
  View, StyleSheet, TouchableOpacity, ToastAndroid,
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { GoogleIcon, InstagramIcon } from '../assets';
import { userOnAuthGoogleRequired } from '../store/actions/users';
import { screenNames } from '../helper/screenNames';

GoogleSignin.configure({
  webClientId: '927711726744-vvls4r3h79pqstjnkcd3lbppaqthtg4t.apps.googleusercontent.com',
  offlineAccess: true,
});

function OnAuth() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const singInFacebook = useCallback(async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile']);
    console.log(result);
    if (result.isCancelled) {
      console.log('User cancelled the login process');
    }

    const data = await AccessToken.getCurrentAccessToken();
    console.log(data, '<<<<');
    if (!data) {
      console.log('Something went wrong obtaining access token');
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    return auth()
      .signInWithCredential(facebookCredential);
  }, []);

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const { idToken } = await GoogleSignin.signIn();
      // const { accessToken } = await GoogleSignin.getTokens();
      const { payload } = await dispatch(userOnAuthGoogleRequired({
        googleToken: idToken,
      }));
      if (payload.token) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: screenNames.appScreen },
            ],
          }),
        );
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };
  return (
    <View
      style={styles.row}
    >
      <TouchableOpacity
        onPress={signInGoogle}
        style={styles.btnOauth}
      >
        <GoogleIcon />
      </TouchableOpacity>
      {/* <TouchableOpacity */}
      {/*   style={styles.btnOauth} */}
      {/*   onPress={singInFacebook} */}
      {/* > */}
      {/*   <InstagramIcon /> */}
      {/* </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  btnOauth: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
});
export default OnAuth;
