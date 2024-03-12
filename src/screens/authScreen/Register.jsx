import React, { useCallback, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { activeOption, globalStyles } from '../../assets/styles/globalStyles';
import TextField from '../../components/custom/TextField';
import TextFieldPassword from '../../components/custom/TextFieldPassword';
import FormButton from '../../components/custom/FormButton';
import useChanges from '../../components/hooks/useChanges';
import { userRegisterRequired } from '../../store/actions/users';
import { screenNames } from '../../helper/screenNames';

function Register() {
  const [errors, setErrors] = useState({});
  const loading = useSelector((state) => state.users.loading);
  const {
    values,
    handleChange,
  } = useChanges({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const navigateLogin = useCallback(() => {
    navigate.navigate('login');
    setErrors({});
  }, []);

  const handleRegister = useCallback(async () => {
    const { payload } = await dispatch(userRegisterRequired(values));
    if (payload?.errors) {
      setErrors(payload.errors);
    }
    if (payload.status === 'ok') {
      ToastAndroid.show('The message sent to your email Please confirm it', ToastAndroid.SHORT);
      setTimeout(() => {
        navigate.navigate(screenNames.login);
      }, 1000);
      setErrors({});
    }
  }, [values]);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        style={styles.container}
      >
        <ImageBackground
          source={require('../../assets/images/Login.png')}
          style={styles.images}
        >
          <View
            style={styles.imagesContainer}
          >
            <Text
              style={styles.title}
            >
              Register Account
            </Text>
            <View style={styles.form}>
              <TextField
                placeholderTextColor="#909DA1"
                placeholder="First Name"
                onChangeText={handleChange('firstName')}
                value={values.firstName}
                style={
                    globalStyles.loginToRegisterTextField
                  }
              />
              {errors.firstName ? <Text style={styles.errors}>{errors.firstName}</Text> : null}
              <TextField
                placeholderTextColor="#909DA1"
                placeholder="Last Name"
                onChangeText={handleChange('lastName')}
                value={values.lastName}
                style={[
                  globalStyles.loginToRegisterTextField,
                  styles.input,
                ]}
              />
              {errors.lastName ? <Text style={styles.errors}>{errors.lastName}</Text> : null}
              <TextField
                placeholderTextColor="#909DA1"
                placeholder="example@email.com"
                onChangeText={handleChange('email')}
                value={values.email}
                style={[
                  globalStyles.loginToRegisterTextField,
                  styles.input,
                ]}
              />
              {errors.email ? <Text style={styles.errors}>{errors.email}</Text> : null}
              {errors.exists ? <Text style={styles.errors}>{errors.exists}</Text> : null}
              <TextFieldPassword
                placeholderTextColor="#909DA1"
                placeholder="password"
                onChangeText={handleChange('password')}
                value={values.password}
                style={
                    globalStyles.loginToRegisterTextField
                  }
              />
              {errors.password ? <Text style={styles.errors}>{errors.password}</Text> : null}
              <TextFieldPassword
                placeholderTextColor="#909DA1"
                placeholder="confirm password"
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword}
                style={
                    globalStyles.loginToRegisterTextField
                  }
              />
              {errors.confirmPassword
                ? (
                  <Text style={styles.errors}>
                    {errors.confirmPassword}
                  </Text>
                ) : null}
              <FormButton
                loading={loading}
                style={[
                  globalStyles.formButton,
                  { marginTop: 30 },
                ]}
                title="Sign Up"
                onPress={handleRegister}
              />
            </View>
            <View
              style={styles.bottomContent}
            >
              <Text
                style={styles.titleContent}
              >
                Already have an account?
              </Text>
              <View
                style={styles.singView}
              >
                <TouchableOpacity
                  activeOpacity={activeOption}
                  onPress={navigateLogin}
                >
                  <Text
                    style={styles.singText}
                  >
                    Log in
                  </Text>
                </TouchableOpacity>
              </View>
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
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 42,
    lineHeight: 50.86,
    textAlign: 'center',

  },
  imagesContainer: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 102,
    backgroundColor: 'rgba(0,0,12,0.5)',
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 24,
  },
  forgotBtnForm: {
    alignItems: 'flex-end',
    marginVertical: 22,
    paddingRight: 6,
  },
  forgotBtn: {
    width: 125,
  },
  input: {
    marginTop: 30,
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
});
export default Register;
