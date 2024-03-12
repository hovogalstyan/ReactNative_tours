import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { activeOption, globalStyles } from '../../assets/styles/globalStyles';
import TextField from '../../components/custom/TextField';
import TextFieldPassword from '../../components/custom/TextFieldPassword';
import FormButton from '../../components/custom/FormButton';
import useChanges from '../../components/hooks/useChanges';
import OnAuth from '../../components/OnAuth';
import {
  userLoginRequired,
} from '../../store/actions/users';
import { screenNames } from '../../helper/screenNames';

function Login() {
  const [errors, setErrors] = useState({});
  const {
    values,
    handleChange,
  } = useChanges({
    email: '',
    password: '',
  });
  const loading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = useCallback(async () => {
    const { payload } = await dispatch(userLoginRequired(values));
    if (payload.errors) {
      return setErrors(payload.errors);
    }
    if (payload.status === 'ok') {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: screenNames.appScreen },
          ],
        }),
      );
      setErrors({});
    }
  }, [values]);
  const navigateRegister = useCallback(() => {
    navigation.navigate(screenNames.register);
    setErrors({});
  }, []);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate(screenNames.forgotPassword);
    setErrors({});
  }, []);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('../../assets/images/Login.png')}
          style={styles.images}
        >
          <View
            style={styles.imagesContainer}
          >
            <Text
              style={globalStyles.loginToRegisterTitle}
            >
              Welcome to Armenian Travel
            </Text>
            <View style={styles.form}>
              {/* eslint-disable-next-line max-len */}
              {errors.exsist
                ? (
                  <Text style={styles.errorsHeader}>
                    {errors.exsist}
                  </Text>
                ) : null}
              <TextField
                placeholderTextColor="#909DA1"
                placeholder="example@email.com"
                onChangeText={handleChange('email')}
                value={values.email}
                style={
                  globalStyles.loginToRegisterTextField
                }
              />
              {errors.email ? <Text style={styles.errors}>{errors.email}</Text> : null}
              {errors.actvateError
                ? <Text style={styles.errors}>{errors.actvateError}</Text> : null}
              <TextFieldPassword
                placeholderTextColor="#909DA1"
                placeholder="password"
                onChangeText={handleChange('password')}
                value={values.password}
                style={
                  globalStyles.loginToRegisterTextField
                }
              />
              {errors.password
                && <Text style={styles.errors}>{errors.password}</Text>}
              <View style={styles.forgotBtnForm}>
                <TouchableOpacity
                  onPress={handleForgotPassword}
                  activeOpacity={activeOption}
                  style={styles.forgotBtn}
                >
                  <Text
                    style={styles.forgotBtnText}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <FormButton
                style={globalStyles.formButton}
                title="Log In"
                onPress={handleLogin}
                loading={loading}
              />
            </View>
            <View
              style={styles.bottomContent}
            >
              <Text
                style={styles.titleContent}
              >
                Don’t have an account?
              </Text>
              <View
                style={styles.singView}
              >
                <TouchableOpacity
                  activeOpacity={activeOption}
                  onPress={navigateRegister}
                >
                  <Text
                    style={styles.singText}
                  >
                    Sing Up
                  </Text>
                </TouchableOpacity>
              </View>
              <OnAuth />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    flex: 1,
  },
  imagesContainer: {
    flex: 1,
    paddingTop: 206,
    paddingBottom: 102,
    backgroundColor: 'rgba(0,0,12,0.5)',
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 24,
  },
  forgotBtnForm: {
    width: '100%',
    alignItems: 'flex-end',
    marginVertical: 22,
    paddingRight: 6,
  },
  forgotBtn: {
    maxWidth: 125,
  },
  forgotBtnText: {
    maxWidth: 152,
    fontWeight: '600',
    fontSize: 15,
    color: '#fff',
    borderStyle: 'solid',
    borderColor: '#fff',
    borderBottomWidth: 0.5,
  },
  bottomContent: {
    alignItems: 'center',
  },
  titleContent: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 21.78,
  },
  singView: {
    alignItems: 'center',
    marginTop: 8,
  },
  singText: {
    color: '#FF9500',
    fontSize: 28,
    fontWeight: '800',
    borderStyle: 'solid',
    borderColor: '#fff',
    borderBottomWidth: 0.5,
  },
  errors: {
    color: '#fff',
    lineHeight: 25,
  },
  errorsHeader: {
    color: '#fff',
    marginBottom: 5,
    marginLeft: 7,
  },
});
export default Login;
